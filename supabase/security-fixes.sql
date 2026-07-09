-- Security fixes for existing Supabase schema
-- Run these commands in your Supabase SQL editor to fix the warnings

-- 1. Add search_path protection to is_admin() function
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

-- 2. Add search_path protection to touch_updated_at() function
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

-- 3. Drop and recreate the message insert policy with field validation
drop policy if exists "Anyone can submit contact messages" on public.messages;
create policy "Anyone can submit contact messages" on public.messages 
for insert with check (email is not null and subject is not null and message is not null);

-- 4. Add explicit read policy for messages
drop policy if exists "Admins read and update messages" on public.messages;
create policy "Admins can read all messages" on public.messages 
for select using (public.is_admin());

-- 5. Update storage policies for portfolio bucket
drop policy if exists "Public portfolio storage read" on storage.objects;
drop policy if exists "Admins portfolio storage write" on storage.objects;

create policy "Public portfolio storage read" on storage.objects
for select using (bucket_id = 'portfolio' and name like 'resume/%');

create policy "Admins portfolio storage full access" on storage.objects
for all using (bucket_id = 'portfolio' and public.is_admin())
with check (bucket_id = 'portfolio' and public.is_admin());
