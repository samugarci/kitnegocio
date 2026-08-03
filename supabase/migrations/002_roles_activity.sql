-- KitNegocio: roles y auditoría de actividad interna
-- Ejecutar después de 001_auth_profiles.sql

alter table public.profiles
  add column if not exists role text not null default 'buyer'
  check (role in ('super_admin', 'buyer'));

create table if not exists public.activity_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  event_type text not null
    check (event_type in ('register', 'login', 'logout', 'download', 'subscription_update')),
  detail text not null default '',
  created_at timestamptz not null default now()
);

create index if not exists activity_logs_user_created_idx
  on public.activity_logs (user_id, created_at desc);

alter table public.activity_logs enable row level security;

drop policy if exists "activity_select_own" on public.activity_logs;
create policy "activity_select_own"
  on public.activity_logs for select
  using (auth.uid() = user_id);

-- El panel de administración usa exclusivamente service_role desde el servidor.
-- Nunca se expone SUPABASE_SERVICE_ROLE_KEY al navegador.

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, phone, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.raw_user_meta_data->>'phone', ''),
    'buyer'
  );
  return new;
end;
$$;
