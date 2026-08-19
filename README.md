# KitNegocio — Packs mensuales Instagram & WhatsApp Business

Suscripción ($16 USD/mes, cobro inmediato al inscribirse, +7 días de bono) con packs de posts, Reels, Stories y mensajes de WhatsApp Business para **tu** negocio. Landing bilingüe, Stripe y área de miembros.

## Cómo abrir el proyecto

### Opción 1 — Doble clic (Windows)

1. Abre la carpeta del repositorio (`kitnegocio`).
2. Haz **doble clic** en `ABRIR-KITNEGOCIO.cmd`.
3. Espera a que se abra el navegador en http://localhost:3000/es

La primera vez instala dependencias sola. Necesitas [Node.js 18+](https://nodejs.org). No cierres la ventana **KitNegocio Server**.

### Opción 2 — Abrir en Cursor

1. En Cursor: **File → Open Folder…** (o `Ctrl+K` luego `Ctrl+O`).
2. Elige la carpeta `kitnegocio` (la que contiene `package.json`).
3. Abre la terminal (`Ctrl+Ñ` o **Terminal → New Terminal**) y ejecuta:

```powershell
npm install
copy .env.example .env.local
npm run dev
```

4. Abre http://localhost:3000/es

### Opción 3 — Terminal

```powershell
cd ruta\a\kitnegocio
npm install
copy .env.example .env.local
npm run dev
```

## Requisitos

- Node.js 18+
- npm

## Instalación

Si no usaste el atajo de doble clic:

```powershell
npm install
copy .env.example .env.local
```

## Configuración Stripe

1. Crea cuenta en [stripe.com](https://stripe.com)
2. Obtén tus claves en [dashboard.stripe.com/apikeys](https://dashboard.stripe.com/apikeys)
3. Activa el **Customer Portal** en Settings → Billing → Customer portal
4. Edita `.env.local`:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_tu_clave
STRIPE_SECRET_KEY=sk_test_tu_clave
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SUPPORT_EMAIL=soporte@kitnegocio.com
```

> **Modo demo:** Sin claves Stripe configuradas, el flujo simula suscripción y cualquier email con `@` accede al área de miembros.

## Ejecutar

```powershell
npm run dev
```

Abre:
- Español: http://localhost:3000/es
- Inglés: http://localhost:3000/en

## Páginas

| Ruta | Descripción |
|------|-------------|
| `/es` o `/en` | Landing principal |
| `/es/inscripcion` | Registro + prueba gratis 7 días |
| `/es/resultado` | Confirmación post-registro |
| `/es/miembros` | Área de miembros (descargas) |
| `/es/soporte` | Contacto soporte |
| `/es/terminos` | Términos y Condiciones |
| `/es/privacidad` | Política de Privacidad |

## Plantillas

Los archivos de demo están en `public/packs/`. Reemplázalos con tus plantillas reales (XLSX, PDF, Canva exports).

## Producción

```powershell
npm run build
npm start
```

Despliega en [Vercel](https://vercel.com) y configura las variables de entorno.
