-- ============================================
-- FrancaisPass — Complete Database Schema
-- Run this entire script in one go in SQL Editor
-- ============================================

-- 01_auth_profiles.sql
-- (uuid-ossp is pre-installed in modern Supabase, skip it)

create table if not exists public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text unique not null,
  full_name text,
  avatar_url text,
  clb_target integer check (clb_target >= 4 and clb_target <= 10),
  preferred_exam text check (preferred_exam in ('tef', 'tcf')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.profiles enable row level security;
create policy "Public profiles are viewable by everyone." on profiles for select using ( true );
create policy "Users can insert their own profile." on profiles for insert with check ( auth.uid() = id );
create policy "Users can update own profile." on profiles for update using ( auth.uid() = id );

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

-- Drop trigger first if it exists, then create
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 02_subscriptions.sql
create table if not exists public.subscriptions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  stripe_subscription_id text unique,
  stripe_customer_id text,
  status text check (status in ('active', 'trialing', 'past_due', 'canceled', 'incomplete', 'incomplete_expired', 'paused')) not null,
  price_id text,
  product_id text,
  current_period_start timestamp with time zone,
  current_period_end timestamp with time zone,
  canceled_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.subscriptions enable row level security;
create policy "Users can view own subscription." on subscriptions for select using ( auth.uid() = user_id );
create policy "Users can update own subscription." on subscriptions for update using ( auth.uid() = user_id );

-- 03_tests.sql
create table if not exists public.mock_tests (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  exam_type text check (exam_type in ('tef', 'tcf')) not null,
  module text check (module in ('reading', 'listening', 'writing', 'speaking')) not null,
  difficulty text check (difficulty in ('beginner', 'intermediate', 'advanced')),
  duration_minutes integer,
  passage_content text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.mock_tests enable row level security;
create policy "Tests are viewable by everyone." on public.mock_tests for select using ( true );

create table if not exists public.test_questions (
  id uuid default gen_random_uuid() primary key,
  test_id uuid references public.mock_tests on delete cascade not null,
  question_text text not null,
  options jsonb,
  correct_answer text,
  points integer default 1,
  order_index integer default 0,
  audio_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.test_questions enable row level security;
create policy "Questions are viewable by everyone." on public.test_questions for select using ( true );

create table if not exists public.test_attempts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  test_id uuid references public.mock_tests on delete cascade not null,
  score numeric,
  max_score numeric,
  clb_level integer,
  started_at timestamp with time zone default timezone('utc'::text, now()) not null,
  completed_at timestamp with time zone
);
alter table public.test_attempts enable row level security;
create policy "Users can view own attempts." on public.test_attempts for select using (auth.uid() = user_id);
create policy "Users can start own attempts." on public.test_attempts for insert with check (auth.uid() = user_id);
create policy "Users can update own attempts." on public.test_attempts for update using (auth.uid() = user_id);

create table if not exists public.user_answers (
  id uuid default gen_random_uuid() primary key,
  attempt_id uuid references public.test_attempts on delete cascade not null,
  question_id uuid references public.test_questions on delete cascade not null,
  user_answer text,
  is_correct boolean,
  ai_feedback jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.user_answers enable row level security;
create policy "Users can view own answers." on public.user_answers for select using (exists (select 1 from public.test_attempts where id = attempt_id and user_id = auth.uid()));
create policy "Users can submit own answers." on public.user_answers for insert with check (exists (select 1 from public.test_attempts where id = attempt_id and user_id = auth.uid()));

-- 04_vocabulary.sql
create table if not exists public.vocabulary (
  id uuid default gen_random_uuid() primary key,
  french_word text not null,
  english_definition text not null,
  example_sentence text,
  difficulty text check (difficulty in ('a1','a2','b1','b2','c1')),
  category text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.vocabulary enable row level security;
create policy "Vocabulary is viewable by all." on public.vocabulary for select using ( true );

create table if not exists public.user_vocabulary_progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  word_id uuid references public.vocabulary on delete cascade not null,
  ease_factor numeric default 2.5,
  interval integer default 0,
  repetitions integer default 0,
  next_review timestamp with time zone default timezone('utc'::text, now()) not null,
  last_reviewed timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, word_id)
);
alter table public.user_vocabulary_progress enable row level security;
create policy "Users can manage own vocab progress." on public.user_vocabulary_progress using (auth.uid() = user_id);

-- 05_ai_features.sql
create table if not exists public.ai_tutor_conversations (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  title text,
  messages jsonb default '[]'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.ai_tutor_conversations enable row level security;
create policy "Users can see own tutor history." on public.ai_tutor_conversations using (auth.uid() = user_id);

create table if not exists public.study_plans (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  plan_data jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.study_plans enable row level security;
create policy "Users can see own study plans." on public.study_plans using (auth.uid() = user_id);

create table if not exists public.writing_submissions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  prompt text,
  user_text text,
  ai_feedback jsonb,
  clb_score numeric,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.writing_submissions enable row level security;
create policy "Users can see own writing submissions." on public.writing_submissions using (auth.uid() = user_id);

create table if not exists public.speaking_evaluations (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  prompt text,
  audio_url text,
  transcript text,
  ai_feedback jsonb,
  clb_score numeric,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.speaking_evaluations enable row level security;
create policy "Users can see own speaking evals." on public.speaking_evaluations using (auth.uid() = user_id);

-- 06_community_and_news.sql
create table if not exists public.news_articles (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  content text not null,
  summary text,
  source text,
  source_url text,
  image_url text,
  difficulty text check (difficulty in ('a1','a2','b1','b2','c1')),
  category text,
  published_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.news_articles enable row level security;
create policy "News is viewable by all." on public.news_articles for select using ( true );

create table if not exists public.community_posts (
  id uuid default gen_random_uuid() primary key,
  author_id uuid references auth.users on delete cascade not null,
  title text not null,
  content text,
  category text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.community_posts enable row level security;
create policy "Users can view posts." on public.community_posts for select using ( true );
create policy "Users can create posts." on public.community_posts for insert with check (auth.uid() = author_id);
create policy "Users can edit own posts." on public.community_posts for update using (auth.uid() = author_id);

-- 07_tracking.sql
create table if not exists public.progress_tracking (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  activity_type text not null,
  activity_data jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.progress_tracking enable row level security;
create policy "Users can see own tracking." on public.progress_tracking using (auth.uid() = user_id);

create table if not exists public.daily_stats (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  date date not null,
  minutes_studied integer default 0,
  tests_completed integer default 0,
  words_learned integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, date)
);
alter table public.daily_stats enable row level security;
create policy "Users can see own stats." on public.daily_stats using (auth.uid() = user_id);

-- Add indexes
create index if not exists idx_test_attempts_user on public.test_attempts(user_id);
create index if not exists idx_test_questions_test on public.test_questions(test_id);
create index if not exists idx_user_answers_attempt on public.user_answers(attempt_id);
create index if not exists idx_vocab_progress_user on public.user_vocabulary_progress(user_id);
create index if not exists idx_vocab_progress_review on public.user_vocabulary_progress(next_review);
create index if not exists idx_daily_stats_user on public.daily_stats(user_id, date);
