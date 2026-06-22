-- 05_ai_features.sql

create table public.study_plans (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  plan_data jsonb not null, -- AI generated schedule/tasks
  start_date date not null,
  end_date date,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.ai_tutor_conversations (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  messages jsonb not null default '[]'::jsonb,
  context_type text, -- e.g. 'exam_prep', 'general_practice', 'vocabulary'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.speaking_evaluations (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  audio_url text not null,
  transcript text,
  pronunciation_score float,
  fluency_score float,
  grammar_score float,
  vocabulary_score float,
  feedback text,
  overall_clb integer,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.writing_submissions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  prompt text,
  user_content text not null,
  grammar_score float,
  coherence_score float,
  vocabulary_score float,
  task_response_score float,
  feedback text,
  overall_clb integer,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS
alter table public.study_plans enable row level security;
create policy "Users can see their own study plans." on public.study_plans using (auth.uid() = user_id);

alter table public.ai_tutor_conversations enable row level security;
create policy "Users can see their own tutor history." on public.ai_tutor_conversations using (auth.uid() = user_id);

alter table public.speaking_evaluations enable row level security;
create policy "Users can see their own speaking evals." on public.speaking_evaluations using (auth.uid() = user_id);

alter table public.writing_submissions enable row level security;
create policy "Users can see their own writing submissions." on public.writing_submissions using (auth.uid() = user_id);
