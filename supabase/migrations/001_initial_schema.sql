-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Users table (synced with NextAuth)
create table if not exists public.users (
  id text primary key,
  email text unique not null,
  name text,
  image text,
  google_access_token text,
  google_refresh_token text,
  google_token_expires_at bigint,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Families table
create table if not exists public.families (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_by uuid not null references public.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Family members (join table)
create table if not exists public.family_members (
  id uuid primary key default gen_random_uuid(),
  family_id uuid not null references public.families(id) on delete cascade,
  user_id uuid not null references public.users(id) on delete cascade,
  role text not null default 'member' check (role in ('admin', 'member')),
  color text not null default '#6B8E6B',
  joined_at timestamptz not null default now(),
  unique(family_id, user_id)
);

-- Calendar settings per family
create table if not exists public.calendar_settings (
  id uuid primary key default gen_random_uuid(),
  family_id uuid unique not null references public.families(id) on delete cascade,
  google_calendar_id text not null,
  google_calendar_name text not null,
  updated_by uuid not null references public.users(id) on delete cascade,
  updated_at timestamptz not null default now()
);

-- Indexes
create index if not exists idx_family_members_family_id on public.family_members(family_id);
create index if not exists idx_family_members_user_id on public.family_members(user_id);
create index if not exists idx_calendar_settings_family_id on public.calendar_settings(family_id);

-- Row Level Security
alter table public.users enable row level security;
alter table public.families enable row level security;
alter table public.family_members enable row level security;
alter table public.calendar_settings enable row level security;

-- RLS Policies for users
create policy "Users can view own profile" on public.users
  for select using (auth.uid()::text = id::text);

create policy "Users can update own profile" on public.users
  for update using (auth.uid()::text = id::text);

-- RLS Policies for families
create policy "Family members can view family" on public.families
  for select using (
    exists (
      select 1 from public.family_members
      where family_members.family_id = families.id
      and family_members.user_id::text = auth.uid()::text
    )
  );

create policy "Family admins can update family" on public.families
  for update using (
    exists (
      select 1 from public.family_members
      where family_members.family_id = families.id
      and family_members.user_id::text = auth.uid()::text
      and family_members.role = 'admin'
    )
  );

-- RLS Policies for family_members
create policy "Family members can view members" on public.family_members
  for select using (
    exists (
      select 1 from public.family_members fm
      where fm.family_id = family_members.family_id
      and fm.user_id::text = auth.uid()::text
    )
  );

create policy "Family admins can manage members" on public.family_members
  for all using (
    exists (
      select 1 from public.family_members fm
      where fm.family_id = family_members.family_id
      and fm.user_id::text = auth.uid()::text
      and fm.role = 'admin'
    )
  );

-- RLS Policies for calendar_settings
create policy "Family members can view calendar settings" on public.calendar_settings
  for select using (
    exists (
      select 1 from public.family_members
      where family_members.family_id = calendar_settings.family_id
      and family_members.user_id::text = auth.uid()::text
    )
  );

create policy "Family admins can manage calendar settings" on public.calendar_settings
  for all using (
    exists (
      select 1 from public.family_members
      where family_members.family_id = calendar_settings.family_id
      and family_members.user_id::text = auth.uid()::text
      and family_members.role = 'admin'
    )
  );

-- Updated at trigger function
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Apply updated_at triggers
create trigger handle_users_updated_at
  before update on public.users
  for each row execute function public.handle_updated_at();

create trigger handle_families_updated_at
  before update on public.families
  for each row execute function public.handle_updated_at();

create trigger handle_calendar_settings_updated_at
  before update on public.calendar_settings
  for each row execute function public.handle_updated_at();
