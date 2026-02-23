-- Profiles table: extends Supabase auth.users
create table if not exists public.profiles (
  id uuid primary key references auth.users on delete cascade,
  full_name text,
  company_name text,
  created_at timestamptz default now()
);

-- SaaS subscriptions (simple plan tracking)
create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete cascade,
  plan text not null default 'starter',
  status text not null default 'trialing',
  renews_at timestamptz,
  created_at timestamptz default now()
);

-- Voice agent configuration per customer
create table if not exists public.voice_agents (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete cascade,
  display_name text not null,
  twilio_phone_number text,
  twilio_account_sid text,
  twilio_auth_token text,
  elevenlabs_agent_id text,
  timezone text default 'UTC',
  availability jsonb default '[]'::jsonb,
  created_at timestamptz default now()
);

-- Appointment log captured by voice agents
create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  voice_agent_id uuid references public.voice_agents(id) on delete cascade,
  customer_name text,
  customer_phone text,
  scheduled_for timestamptz,
  notes text,
  status text default 'pending',
  metadata jsonb,
  created_at timestamptz default now()
);

-- Call log for analytics
create table if not exists public.call_logs (
  id uuid primary key default gen_random_uuid(),
  voice_agent_id uuid references public.voice_agents(id) on delete cascade,
  direction text not null,
  caller text,
  transcript text,
  took_action boolean default false,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;
alter table public.subscriptions enable row level security;
alter table public.voice_agents enable row level security;
alter table public.appointments enable row level security;
alter table public.call_logs enable row level security;

create policy "profiles are editable by owner" on public.profiles
  for all using (auth.uid() = id);

create policy "user data" on public.subscriptions
  for all using (auth.uid() = profile_id);

create policy "user agents" on public.voice_agents
  for all using (auth.uid() = profile_id);

create policy "user appointments" on public.appointments
  for all using (
    auth.uid() in (
      select profile_id from public.voice_agents where voice_agents.id = appointments.voice_agent_id
    )
  );

create policy "user calls" on public.call_logs
  for all using (
    auth.uid() in (
      select profile_id from public.voice_agents where voice_agents.id = call_logs.voice_agent_id
    )
  );
create table if not exists public.early_access (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  created_at timestamptz default now()
);

alter table public.early_access enable row level security;
create policy "self insert" on public.early_access for insert with check (true);
create policy "view own" on public.early_access for select using (auth.role() = 'service_role');
