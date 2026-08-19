# KitNegocio — Packs de Instagram y WhatsApp Business

Acceso único (USD $19.99) a catálogos de posts, Reels, Stories y mensajes de WhatsApp Business. Landing bilingüe (ES/EN), Stripe y área de miembros.

## Requisitos

- Node.js 18+
- npm

## Instalación

```bash
npm install
cp .env.example .env.local
```

En Windows PowerShell:

```powershell
npm install
copy .env.example .env.local
```

## Configuración

Edita `.env.local` con tus claves. Sin Stripe ni Supabase, la app corre en **modo demo** (auth local en `data/users.json` y checkout simulado).

Guías:

- Stripe y variables: `.env.example`
- Auth y base de datos: [docs/supabase.md](docs/supabase.md)
- Plan de negocio: [docs/plan-negocio.md](docs/plan-negocio.md)
- Documento legal: [docs/legal.md](docs/legal.md)

## Ejecutar

```bash
npm run dev
```

En Windows también puedes usar `ABRIR-KITNEGOCIO.cmd`.

Abre:

- Español: http://localhost:3000/es
- Inglés: http://localhost:3000/en

## Páginas

| Ruta | Descripción |
|------|-------------|
| `/es` o `/en` | Landing |
| `/es/inscripcion` | Compra / registro |
| `/es/resultado` | Confirmación |
| `/es/miembros` | Área privada (descargas) |
| `/es/admin` | Panel super admin |
| `/es/soporte` | Contacto |
| `/es/terminos` | Términos |
| `/es/privacidad` | Privacidad |
| `/es/cookies` | Cookies |
| `/es/aviso-legal` | Aviso legal |

## Estructura

```
src/
  app/                 # Rutas Next.js (páginas y API)
  components/
    layout/            # Header, footer, cookies, idioma
    landing/           # Secciones de la home
    auth/              # Inscripción y resultado
    members/           # Área de miembros
    admin/             # Panel admin
    support/           # Formulario de soporte
    legal/             # Textos legales
    brand/             # Logo
  lib/                 # Auth, Stripe, packs, imágenes
  i18n/                # Locales
messages/              # Traducciones ES/EN
public/images/         # Ilustraciones de marca
public/packs/          # Archivos descargables
docs/                  # Documentación de producto
scripts/               # Guías PDF, usuarios demo, launcher
supabase/migrations/   # SQL de perfiles y roles
```

## Scripts

| Comando | Qué hace |
|---------|----------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm start` | Sirve el build |
| `npm run lint` | ESLint |
| `npm run guides` | Genera los PDF del pack de marzo |
| `npm run demo:users` | Crea admin y comprador de demo |
| `npm run demo:verify` | Comprueba login, admin y descargas |

Los packs de demo viven en `public/packs/`. Tras `npm run guides` se regeneran las guías PDF de marzo.

## Producción

```bash
npm run build
npm start
```

Despliega en [Vercel](https://vercel.com) y configura las mismas variables de `.env.example`.
