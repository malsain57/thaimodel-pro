create extension if not exists pgcrypto;

create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique references auth.users(id) on delete cascade,
  role text not null default 'client' check (role in ('client','model','admin')),
  nickname text,
  age int,
  city text,
  type text default 'model',
  about text,
  whatsapp text,
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  active_plan boolean not null default false,
  plan text default 'none',
  boost_vip boolean default false,
  boost_select boolean default false,
  boost_top boolean default false,
  verified boolean default false,
  views int default 0,
  created_at timestamptz default now()
);

create table if not exists photos (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id) on delete cascade,
  url text not null,
  is_cover boolean default false,
  created_at timestamptz default now()
);

create table if not exists comments (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id) on delete cascade,
  author_id uuid references profiles(id) on delete set null,
  content text not null,
  is_approved boolean default true,
  created_at timestamptz default now()
);

create table if not exists favorites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  profile_id uuid references profiles(id) on delete cascade,
  created_at timestamptz default now(),
  unique(user_id, profile_id)
);

alter table profiles enable row level security;
alter table photos enable row level security;
alter table comments enable row level security;
alter table favorites enable row level security;

create policy "public approved profiles" on profiles for select using (status='approved' and active_plan=true or auth.uid() = user_id);
create policy "insert own profile" on profiles for insert with check (auth.uid() = user_id);
create policy "update own profile" on profiles for update using (auth.uid() = user_id);

create policy "public photos" on photos for select using (true);
create policy "insert photos own profile" on photos for insert with check (exists(select 1 from profiles p where p.id=profile_id and p.user_id=auth.uid()));

create policy "public comments" on comments for select using (is_approved=true);
create policy "insert comments authenticated" on comments for insert with check (auth.uid() is not null);

create policy "own favorites" on favorites for select using (auth.uid()=user_id);
create policy "insert own favorites" on favorites for insert with check (auth.uid()=user_id);
create policy "delete own favorites" on favorites for delete using (auth.uid()=user_id);
