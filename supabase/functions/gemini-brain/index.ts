import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

interface RequestBody {
  prompt: string;
  lang: 'es' | 'en';
  currentPage: string;
  conversationHistory?: ConversationMessage[];
  currentTurn?: number;
  maxTurns?: number;
}

interface GeminiResponse {
  intent: 'navigate' | 'read' | 'query';
  route?: string;
  emotion: 'happy' | 'calm' | 'helpful';
  speech: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const {
      prompt,
      lang,
      currentPage,
      conversationHistory = [],
      currentTurn = 1,
      maxTurns = 4
    }: RequestBody = await req.json();

    const geminiApiKey = Deno.env.get('GEMINI_API_KEY') || '';

    const conversationContext = conversationHistory.length > 0
      ? conversationHistory.map(msg =>
          `${msg.role === 'user' ? 'Usuario' : 'Hidri'}: ${msg.content}`
        ).join('\n')
      : '';

    const turnInfo = lang === 'es'
      ? `Estás en el turno ${currentTurn} de ${maxTurns}.`
      : `You are on turn ${currentTurn} of ${maxTurns}.`;

    const farewellInstruction = currentTurn >= maxTurns
      ? (lang === 'es'
          ? `\n\nIMPORTANTE: Este es el último turno. Debes despedirte de manera amable y natural, agradeciendo la conversación.`
          : `\n\nIMPORTANT: This is the last turn. You must say goodbye in a friendly and natural way, thanking for the conversation.`)
      : '';

    const systemPrompt = lang === 'es'
      ? `Eres 'Hidri', un asistente bancario amigable y empático de Voz Hídrica (Banorte). Hablas de manera cálida, cercana y conversacional. El usuario está en la página: ${currentPage}. ${turnInfo}${farewellInstruction}

${conversationContext ? `Contexto de la conversación anterior:\n${conversationContext}\n\n` : ''}El usuario acaba de decir: "${prompt}"

Rutas disponibles:
- /auth (login/registro)
- /home (inicio)
- /dashboard (panel principal)
- /rewards (recompensas)
- /green-credit (crédito verde)
- /savings (cuenta de ahorro)
- /settings (configuración)
- /challenges (retos)
- /water-dashboard (dashboard de agua)
- /water-campaign (campaña de agua)
- /financial-education (educación financiera)

Responde en español manteniendo el contexto de la conversación. Usa referencias pronominales naturales si es apropiado (como "eso", "lo que mencionaste", etc).

Responde SOLO con un JSON válido (sin markdown):
{
  "intent": "navigate" | "read" | "query",
  "route": "/ruta" o null,
  "emotion": "happy" | "calm" | "helpful",
  "speech": "Tu respuesta amigable y contextual aquí"
}

Ejemplos:
- "llévame al inicio" → intent: navigate, route: /home
- "muéstrame las recompensas" → intent: navigate, route: /rewards
- "léeme la página" → intent: read, route: null
- "¿qué es el crédito verde?" → intent: query, route: null
- Si el usuario pregunta sobre algo que mencionaste antes, mantén la coherencia con el historial`
      : `You are 'Hidri', a friendly and empathetic banking assistant for Voz Hídrica (Banorte). You speak in a warm, approachable and conversational manner. User is on page: ${currentPage}. ${turnInfo}${farewellInstruction}

${conversationContext ? `Previous conversation context:\n${conversationContext}\n\n` : ''}User just said: "${prompt}"

Available routes:
- /auth (login/register)
- /home (home)
- /dashboard (main panel)
- /rewards (rewards)
- /green-credit (green credit)
- /savings (savings account)
- /settings (settings)
- /challenges (challenges)
- /water-dashboard (water dashboard)
- /water-campaign (water campaign)
- /financial-education (financial education)

Respond in English maintaining the conversation context. Use natural pronoun references if appropriate (like "that", "what you mentioned", etc).

Respond ONLY with valid JSON (no markdown):
{
  "intent": "navigate" | "read" | "query",
  "route": "/route" or null,
  "emotion": "happy" | "calm" | "helpful",
  "speech": "Your friendly and contextual response here"
}

Examples:
- "take me to home" → intent: navigate, route: /home
- "show me rewards" → intent: navigate, route: /rewards
- "read the page" → intent: read, route: null
- "what is green credit?" → intent: query, route: null
- If user asks about something you mentioned before, maintain coherence with the history`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiApiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: systemPrompt }]
          }],
          generationConfig: {
            temperature: 0.8,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 512,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const generatedText = data.candidates[0].content.parts[0].text;

    const cleanedText = generatedText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

    const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No valid JSON in response');
    }

    const geminiResponse: GeminiResponse = JSON.parse(jsonMatch[0]);

    return new Response(
      JSON.stringify(geminiResponse),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error:', error);

    const fallbackResponse: GeminiResponse = {
      intent: 'query',
      emotion: 'calm',
      speech: 'Lo siento, no pude procesar tu solicitud. ¿Puedes repetirlo?',
    };

    return new Response(
      JSON.stringify(fallbackResponse),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});
