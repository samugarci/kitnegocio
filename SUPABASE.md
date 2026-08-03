# Configurar Supabase (KitNegocio)

Hasta que pegues claves reales, el registro/login funciona en modo local seguro
(`data/users.json` con contraseñas hasheadas + cookie httpOnly).

## Pasos mínimos

1. Crea un proyecto gratuito en [supabase.com](https://supabase.com).
2. Ve a **Project Settings → API** y copia:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` `public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` `secret` → `SUPABASE_SERVICE_ROLE_KEY` (solo servidor, nunca en el cliente)
3. Pega las tres variables en `C:\dev\kitnegocio\.env.local` (reemplaza los placeholders).
4. En el dashboard, abre **SQL Editor** y ejecuta, en orden:
   - `supabase/migrations/001_auth_profiles.sql`
   - `supabase/migrations/002_roles_activity.sql`
5. En **Authentication → Providers → Email**, deja Email habilitado.
   Para demos locales puedes desactivar “Confirm email”.
6. Reinicia el servidor (`ABRIR-KITNEGOCIO` o `npm run dev`).

## Qué crea la migración

- Tabla `profiles` (nombre, email, teléfono) ligada a `auth.users`
- Tabla `subscriptions` (plan, estado `demo_active`, etc.)
- Roles `super_admin` y `buyer`
- Tabla `activity_logs` para eventos internos (registro, login, descarga y gestión)
- RLS: cada usuario solo lee/actualiza sus filas
- Trigger que crea el perfil al registrarse

## Seguridad

- No subas `.env.local` a Git
- No uses la `service_role` en el navegador
- Las descargas del pack pasan por `/api/download` con sesión válida
- El panel admin nunca muestra contraseñas ni datos de tarjeta
