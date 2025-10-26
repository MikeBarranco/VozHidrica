import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface RequestBody {
  prompt: string;
  lang: 'es' | 'en';
  currentPage: string;
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
    const { prompt, lang, currentPage }: RequestBody = await req.json();

    const geminiApiKey = Deno.env.get('GEMINI_API_KEY') || '';

    const systemPrompt = lang === 'es'
      ? `Eres 'Hidra', un asistente bancario amigable de Voz Hídrica (Banorte). El usuario está en la página: ${currentPage}. 

Analiza lo que el usuario dijo: "${prompt}"

Rutas disponibles:
- /auth (login/registro)
- /dashboard (panel principal)
- /rewards (recompensas)
- /green-credit (crédito verde)
- /savings (cuenta de ahorro)
- /settings (configuración)

Responde en español con un JSON válido:
{
  "intent": "navigate" | "read" | "query",
  "route": "/ruta" o null,
  "emotion": "happy" | "calm" | "helpful",
  "speech": "Tu respuesta amigable aquí"
}

Ejemplos:
- "llévame al login" → intent: navigate, route: /auth
- "muéstrame las recompensas" → intent: navigate, route: /rewards
- "léeme la página" → intent: read, route: null
- "¿qué es el crédito verde?" → intent: query, route: null`
      : `You are 'Hidra', a friendly banking assistant for Voz Hídrica (Banorte). User is on page: ${currentPage}.

Analyze what the user said: "${prompt}"

Available routes:
- /auth (login/register)
- /dashboard (main panel)
- /rewards (rewards)
- /green-credit (green credit)
- /savings (savings account)
- /settings (settings)

Respond in English with valid JSON:
{
  "intent": "navigate" | "read" | "query",
  "route": "/route" or null,
  "emotion": "happy" | "calm" | "helpful",
  "speech": "Your friendly response here"
}

Examples:
- "take me to login" → intent: navigate, route: /auth
- "show me rewards" → intent: navigate, route: /rewards
- "read the page" → intent: read, route: null
- "what is green credit?" → intent: query, route: null`;

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
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const generatedText = data.candidates[0].content.parts[0].text;
    
    const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
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