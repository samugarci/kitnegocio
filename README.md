# KitNegocio — Packs para Instagram y WhatsApp Business

Landing bilingüe, Stripe y área de miembros. Compra única de acceso completo.

## Requisitos

- Node.js 18 o superior
- npm

## Abrir el proyecto

Desde la carpeta del repositorio (da igual la ruta: Escritorio, OneDrive, `C:\dev`, etc.):

```bash
npm install
npm run dev
```

Luego abre:

- Español: http://localhost:3000/es
- Inglés: http://localhost:3000/en

En Windows también puedes hacer doble clic en `ABRIR-KITNEGOCIO.cmd`. El script detecta la carpeta del proyecto, instala dependencias si faltan y arranca el servidor.

## Configuración

La primera vez se crea `.env.local` a partir de `.env.example`. Sin claves reales de Stripe o Supabase la app corre en **modo demo**.

```bash
cp .env.example .env.local   # macOS / Linux
copy .env.example .env.local # Windows
```

### Stripe (opcional)

1. Crea cuenta en [stripe.com](https://stripe.com)
2. Obtén tus claves en [dashboard.stripe.com/apikeys](https://dashboard.stripe.com/apikeys)
3. Activa el Customer Portal en Settings → Billing → Customer portal
4. Edita `.env.local`:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_tu_clave
STRIPE_SECRET_KEY=sk_test_tu_clave
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SUPPORT_EMAIL=soporte@kitnegocio.com
```

### Supabase (opcional)

Sigue `docs/SUPABASE.md`. Mientras uses placeholders, el registro/login funciona en local (`data/users.json`).

## Páginas

| Ruta | Descripción |
|------|-------------|
| `/es` o `/en` | Landing principal |
| `/es/inscripcion` | Registro y compra |
| `/es/resultado` | Confirmación post-registro |
| `/es/miembros` | Área de miembros (descargas) |
| `/es/soporte` | Contacto de soporte |
| `/es/terminos` | Términos y Condiciones |
| `/es/privacidad` | Política de Privacidad |

## Documentación

- `docs/SUPABASE.md` — autenticación y base de datos
- `docs/PLAN-NEGOCIO.md` — plan de negocio
- `docs/DOCUMENTO-LEGAL-KITNEGOCIO.md` — marco legal

## Plantillas

Los archivos de demo están en `public/packs/`. Si faltan las guías PDF, `npm run dev` las genera solos.

## Producción

```bash
npm run build
npm start
```

Despliega en [Vercel](https://vercel.com) y configura las variables de entorno.
