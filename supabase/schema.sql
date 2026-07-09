create extension if not exists "uuid-ossp";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  full_name text not null,
  role text default 'admin',
  avatar_url text,
  created_at timestamptz default now()
);

create table if not exists public.projects (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text unique not null,
  description text not null,
  tech_stack text[] not null default '{}',
  gallery text[] not null default '{}',
  github_url text,
  live_url text,
  features text[] not null default '{}',
  challenges text not null default '',
  architecture text not null default '',
  status text not null default 'Building' check (status in ('Live', 'Building', 'Archived')),
  featured boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.skills (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  category text not null,
  level text not null,
  icon text not null default 'Sparkles',
  years numeric not null default 1,
  created_at timestamptz default now()
);

create table if not exists public.experience (
  id uuid primary key default uuid_generate_v4(),
  role text not null,
  company text not null,
  period text not null,
  summary text not null,
  impact text[] not null default '{}',
  created_at timestamptz default now()
);

create table if not exists public.blogs (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text unique not null,
  excerpt text not null,
  content text not null,
  category text not null,
  tags text[] not null default '{}',
  views integer not null default 0,
  likes integer not null default 0,
  published_at timestamptz default now(),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.certificates (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  issuer text not null,
  issued_at date not null,
  image_url text not null,
  credential_url text,
  created_at timestamptz default now()
);

create table if not exists public.messages (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  is_read boolean default false,
  created_at timestamptz default now()
);

create table if not exists public.settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz default now()
);

alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.skills enable row level security;
alter table public.experience enable row level security;
alter table public.blogs enable row level security;
alter table public.certificates enable row level security;
alter table public.messages enable row level security;
alter table public.settings enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path to public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

create policy "Public can read projects" on public.projects for select using (true);
create policy "Public can read skills" on public.skills for select using (true);
create policy "Public can read experience" on public.experience for select using (true);
create policy "Public can read blogs" on public.blogs for select using (true);
create policy "Public can read certificates" on public.certificates for select using (true);
create policy "Public can read settings" on public.settings for select using (true);

create policy "Anyone can submit contact messages" on public.messages for insert with check (email is not null and subject is not null and message is not null);
create policy "Admins can read all messages" on public.messages for select using (public.is_admin());

create policy "Admins manage profiles" on public.profiles for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage projects" on public.projects for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage skills" on public.skills for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage experience" on public.experience for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage blogs" on public.blogs for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage certificates" on public.certificates for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins read and update messages" on public.messages for select using (public.is_admin());
create policy "Admins update messages" on public.messages for update using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage settings" on public.settings for all using (public.is_admin()) with check (public.is_admin());

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
security definer
set search_path to public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger projects_updated_at before update on public.projects for each row execute procedure public.touch_updated_at();
create trigger blogs_updated_at before update on public.blogs for each row execute procedure public.touch_updated_at();

insert into storage.buckets (id, name, public)
values ('portfolio', 'portfolio', true)
on conflict (id) do nothing;

create policy "Public portfolio storage read" on storage.objects
for select using (bucket_id = 'portfolio' and name like 'resume/%');

create policy "Admins portfolio storage full access" on storage.objects
for all using (bucket_id = 'portfolio' and public.is_admin())
with check (bucket_id = 'portfolio' and public.is_admin());
