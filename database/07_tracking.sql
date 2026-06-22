-- 07_tracking.sql

create table public.progress_tracking (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  activity_type text not null, -- 'test', 'vocabulary', 'ai_tutor', 'reading'
  activity_id uuid, -- reference to the specific activity if applicable
  duration_seconds integer,
  metadata jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Daily aggregation view/table for analytics
create table public.daily_stats (
  user_id uuid references public.profiles(id) on delete cascade not null,
  date date not null,
  total_minutes integer default 0,
  tests_completed integer default 0,
  words_learned integer default 0,
  primary key (user_id, date)
);

-- RLS
alter table public.progress_tracking enable row level security;
create policy "Users can see their own tracking." on public.progress_tracking using (auth.uid() = user_id);

alter table public.daily_stats enable row level security;
create policy "Users can see their own stats." on public.daily_stats using (auth.uid() = user_id);

-- Indexes
create index idx_progress_tracking_user_id on public.progress_tracking(user_id);
create index idx_progress_tracking_created_at on public.progress_tracking(created_at);
