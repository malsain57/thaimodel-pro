-- ThaiModel PRO V8 functional schema
-- Run this in Supabase SQL Editor.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  role text check (role in ('model','client','admin')) default 'client',
  nickname text,
  age int,
  region text,
  city text,
  profile_type text default 'lady',
  nationality text,
  height text,
  weight text,
  languages text[] default array['Thai','English'],
  about text,
  whatsapp text,
  cover_url text,
  plan text check (plan in ('free','starter','select','vip')) default 'free',
  active_plan boolean default false,
  is_approved boolean default false,
  verified boolean default false,
  online boolean default false,
  is_new boolean default true,
  views int default 0,
  today_views int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.photos (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete cascade,
  url text not null,
  is_cover boolean default false,
  created_at timestamptz default now()
);

create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete cascade,
  author_id uuid references auth.users(id) on delete set null,
  rating int default 5,
  content text not null,
  is_approved boolean default false,
  created_at timestamptz default now()
);

create table if not exists public.favorites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  profile_id uuid references public.profiles(id) on delete cascade,
  created_at timestamptz default now(),
  unique(user_id, profile_id)
);

alter table public.profiles enable row level security;
alter table public.photos enable row level security;
alter table public.comments enable row level security;
alter table public.favorites enable row level security;

-- Public can see only approved + active model profiles, and each user can see their own profile.
drop policy if exists "profiles public approved active" on public.profiles;
create policy "profiles public approved active"
on public.profiles for select
using ((is_approved = true and active_plan = true) or auth.uid() = user_id);

-- Users can create their own profile.
drop policy if exists "profiles insert own" on public.profiles;
create policy "profiles insert own"
on public.profiles for insert
with check (auth.uid() = user_id);

-- Users can update their own profile. Admin dashboard can be used by service role if later added.
drop policy if exists "profiles update own" on public.profiles;
create policy "profiles update own"
on public.profiles for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

-- TEMP ADMIN MVP: logged-in users can read/update profiles for admin page during test.
-- Replace this before production with a real admin role claim/service route.
drop policy if exists "profiles admin mvp read" on public.profiles;
create policy "profiles admin mvp read"
on public.profiles for select
using (auth.uid() is not null);

drop policy if exists "profiles admin mvp update" on public.profiles;
create policy "profiles admin mvp update"
on public.profiles for update
using (auth.uid() is not null)
with check (auth.uid() is not null);

-- Photos visible for public approved profiles and owner.
drop policy if exists "photos public" on public.photos;
create policy "photos public"
on public.photos for select
using (true);

drop policy if exists "photos insert own" on public.photos;
create policy "photos insert own"
on public.photos for insert
with check (
  exists (select 1 from public.profiles p where p.id = profile_id and p.user_id = auth.uid())
);

-- Comments: approved comments public, logged users can insert.
drop policy if exists "comments public approved" on public.comments;
create policy "comments public approved"
on public.comments for select
using (is_approved = true or auth.uid() = author_id);

drop policy if exists "comments insert logged" on public.comments;
create policy "comments insert logged"
on public.comments for insert
with check (auth.uid() = author_id);

-- Favorites private.
drop policy if exists "favorites own" on public.favorites;
create policy "favorites own"
on public.favorites for select
using (auth.uid() = user_id);

drop policy if exists "favorites insert own" on public.favorites;
create policy "favorites insert own"
on public.favorites for insert
with check (auth.uid() = user_id);

drop policy if exists "favorites delete own" on public.favorites;
create policy "favorites delete own"
on public.favorites for delete
using (auth.uid() = user_id);

-- Storage bucket for photos
insert into storage.buckets (id, name, public)
values ('photos', 'photos', true)
on conflict (id) do update set public = true;

-- Storage policies
drop policy if exists "photos bucket public read" on storage.objects;
create policy "photos bucket public read"
on storage.objects for select
using (bucket_id = 'photos');

drop policy if exists "photos bucket logged upload" on storage.objects;
create policy "photos bucket logged upload"
on storage.objects for insert
with check (bucket_id = 'photos' and auth.uid() is not null);
