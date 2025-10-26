# 🚀 GUÍA DE DEPLOY - VOZ HÍDRICA

Esta guía te explica cómo hacer el deploy de tu proyecto **Voz Hídrica** en diferentes plataformas **SIN necesidad de usar Bolt**.

---

## 📋 PREPARACIÓN PREVIA

### 1. Variables de Entorno Requeridas

Crea un archivo `.env` con estas variables:

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-key-aqui
```

**IMPORTANTE:** Estas variables ya están configuradas en tu proyecto actual. Cópialas antes de hacer deploy.

### 2. Verificar que el Build Funcione

```bash
npm run build
```

Esto debe completarse sin errores y generar una carpeta `/dist`.

---

## 🌐 OPCIÓN 1: VERCEL (RECOMENDADO - GRATIS)

### Ventajas:
- ✅ Deploy automático desde GitHub
- ✅ HTTPS gratis
- ✅ CDN global
- ✅ Builds automáticos en cada push

### Pasos:

1. **Sube tu código a GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/tu-usuario/voz-hidrica.git
   git push -u origin main
   ```

2. **Ve a Vercel:**
   - https://vercel.com
   - Login con GitHub
   - Click en "New Project"
   - Importa tu repositorio

3. **Configura Variables de Entorno:**
   - En Project Settings → Environment Variables
   - Agrega:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`

4. **Deploy:**
   - Click en "Deploy"
   - ¡Listo! Tu URL será: `https://tu-proyecto.vercel.app`

### Build Settings (Automático):
- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`

---

## 🚀 OPCIÓN 2: NETLIFY (GRATIS)

### Ventajas:
- ✅ Deploy desde GitHub/Git
- ✅ HTTPS gratis
- ✅ Form handling integrado

### Pasos:

1. **Sube tu código a GitHub** (igual que Vercel)

2. **Ve a Netlify:**
   - https://netlify.com
   - Login con GitHub
   - Click en "Add new site" → "Import an existing project"

3. **Conecta tu repositorio**

4. **Build Settings:**
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`

5. **Environment Variables:**
   - Site settings → Environment Variables
   - Agrega las mismas variables de `.env`

6. **Deploy:**
   - Click en "Deploy site"
   - Tu URL será: `https://tu-proyecto.netlify.app`

---

## ⚡ OPCIÓN 3: CLOUDFLARE PAGES (GRATIS)

### Ventajas:
- ✅ CDN ultra rápido de Cloudflare
- ✅ Deploy desde GitHub
- ✅ Unlimited bandwidth

### Pasos:

1. **Sube tu código a GitHub**

2. **Ve a Cloudflare Pages:**
   - https://pages.cloudflare.com
   - Login con tu cuenta Cloudflare
   - Click en "Create a project"

3. **Conecta GitHub** y selecciona tu repositorio

4. **Build Settings:**
   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`

5. **Environment Variables:**
   - Agrega las variables de `.env`

6. **Deploy:**
   - Click en "Save and Deploy"
   - Tu URL será: `https://tu-proyecto.pages.dev`

---

## 🏠 OPCIÓN 4: HOSTING PROPIO

### Si tienes un VPS o servidor:

1. **Build local:**
   ```bash
   npm run build
   ```

2. **Sube la carpeta `/dist` a tu servidor:**
   ```bash
   scp -r dist/* usuario@tu-servidor:/var/www/html/
   ```

3. **Configuración de Nginx:**
   ```nginx
   server {
       listen 80;
       server_name tu-dominio.com;
       root /var/www/html;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```

4. **Reinicia Nginx:**
   ```bash
   sudo systemctl restart nginx
   ```

---

## 🔧 CONFIGURACIÓN POST-DEPLOY

### 1. Configurar Redirect URLs en Supabase

En tu dashboard de Supabase:
- Authentication → URL Configuration
- Agrega tus URLs de producción:
  - `https://tu-dominio.com/**`
  - `https://tu-dominio.com/reset-password`
  - `https://tu-dominio.com/2fa`

### 2. Configurar Email Templates

En Supabase → Authentication → Email Templates:
- Configura los templates para:
  - Password Recovery
  - Email Confirmation (opcional)

### 3. Verificar Supabase Edge Functions

Asegúrate de que estas funciones estén deployadas:
- `elevenlabs-speak`
- `gemini-brain`
- `send-verification-code`

Para verificar:
```bash
supabase functions list
```

---

## 📊 MONITOREO

### Analytics (Opcional)

Puedes agregar:
- **Google Analytics**
- **Vercel Analytics** (gratis con Vercel)
- **Plausible Analytics** (privacy-first)

Agrega el script en `/index.html` antes del `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXX');
</script>
```

---

## 🐛 TROUBLESHOOTING

### Problema: "404 Not Found" en rutas

**Solución:** Configura rewrites para SPA:

**Vercel:** Crea `vercel.json`:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

**Netlify:** Crea `netlify.toml`:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Problema: Variables de entorno no funcionan

**Solución:**
- Asegúrate de que empiecen con `VITE_`
- Reconstruye el proyecto después de agregarlas
- Verifica que no tengan espacios o comillas

### Problema: Build falla

**Solución:**
```bash
# Limpia node_modules y reinstala
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## 🎯 DOMINIO PERSONALIZADO

### En Vercel:
1. Project Settings → Domains
2. Agrega tu dominio
3. Configura DNS según instrucciones

### En Netlify:
1. Site settings → Domain management
2. Add custom domain
3. Configura DNS

### En Cloudflare Pages:
1. Custom domains → Set up a domain
2. Si tu dominio está en Cloudflare, es automático

---

## 🔒 SEGURIDAD

### Checklist pre-producción:

- [ ] Variables de entorno configuradas correctamente
- [ ] API keys NO están en el código fuente
- [ ] RLS policies habilitadas en todas las tablas
- [ ] HTTPS habilitado
- [ ] CORS configurado correctamente
- [ ] Rate limiting configurado (Supabase lo maneja)

---

## 📞 SOPORTE

### Recursos útiles:
- **Vercel Docs:** https://vercel.com/docs
- **Netlify Docs:** https://docs.netlify.com
- **Cloudflare Docs:** https://developers.cloudflare.com/pages
- **Supabase Docs:** https://supabase.com/docs

---

**¡Tu proyecto está listo para producción!** 🎉

Elige la plataforma que prefieras y sigue los pasos. Todas son **GRATIS** para proyectos pequeños/medianos.

**Recomendación:** Usa **Vercel** por su integración perfecta con React/Vite y su facilidad de uso.
