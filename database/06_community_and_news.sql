-- 06_community_and_news.sql

create table public.news_articles (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  content text not null,
  summary text,
  source_url text,
  image_url text,
  published_at timestamp with time zone,
  difficulty_level text check (difficulty_level in ('a1', 'a2', 'b1', 'b2', 'c1', 'c2')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.study_groups (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text,
  avatar_url text,
  is_private boolean default false,
  created_by uuid references public.profiles(id) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.community_posts (
  id uuid default uuid_generate_v4() primary key,
  group_id uuid references public.study_groups(id) on delete cascade,
  author_id uuid references public.profiles(id) on delete cascade not null,
  title text,
  content text not null,
  upvotes integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS
alter table public.news_articles enable row level security;
create policy "News is readable by everyone." on public.news_articles for select using (true);

alter table public.study_groups enable row level security;
create policy "Groups are readable by everyone." on public.study_groups for select using (true);
create policy "Authenticated users can create groups." on public.study_groups for insert with check (auth.role() = 'authenticated');

alter table public.community_posts enable row level security;
create policy "Posts are readable by everyone." on public.community_posts for select using (true);
create policy "Users can create posts." on public.community_posts for insert with check (auth.uid() = author_id);
create policy "Users can edit own posts." on public.community_posts for update using (auth.uid() = author_id);

-- Indexes
create index idx_community_posts_group_id on public.community_posts(group_id);
create index idx_community_posts_author_id on public.community_posts(author_id);
