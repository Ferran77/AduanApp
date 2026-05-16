-- Ejecutar en Supabase → SQL Editor (una vez por proyecto)

create table if not exists public.learning_data (
  id uuid primary key default gen_random_uuid(),
  query text not null,
  selected_fraccion text,
  created_at timestamptz not null default now()
);

create table if not exists public.search_history (
  id uuid primary key default gen_random_uuid(),
  query text not null,
  results jsonb not null default '[]'::jsonb,
  selected_fraccion text,
  created_at timestamptz not null default now()
);

alter table public.learning_data enable row level security;
alter table public.search_history enable row level security;

drop policy if exists "learning_data_anon_all" on public.learning_data;
create policy "learning_data_anon_all"
  on public.learning_data
  for all
  to anon, authenticated
  using (true)
  with check (true);

drop policy if exists "search_history_anon_all" on public.search_history;
create policy "search_history_anon_all"
  on public.search_history
  for all
  to anon, authenticated
  using (true)
  with check (true);
