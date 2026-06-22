-- 03_tests.sql

create type exam_type as enum ('tef', 'tcf');
create type module_type as enum ('reading', 'listening', 'writing', 'speaking');

create table public.mock_tests (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  exam_type exam_type not null,
  module module_type not null,
  difficulty text check (difficulty in ('beginner', 'intermediate', 'advanced')),
  duration_minutes integer,
  is_premium boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.test_questions (
  id uuid default uuid_generate_v4() primary key,
  test_id uuid references public.mock_tests(id) on delete cascade not null,
  question_text text,
  audio_url text, -- For listening modules
  image_url text, -- For reading/writing prompts
  options jsonb, -- e.g. ["A", "B", "C", "D"]
  correct_answer text,
  explanation text,
  points integer default 1,
  order_index integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.test_attempts (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  test_id uuid references public.mock_tests(id) on delete cascade not null,
  score integer,
  max_score integer,
  clb_equivalent integer,
  started_at timestamp with time zone default timezone('utc'::text, now()) not null,
  completed_at timestamp with time zone
);

create table public.user_answers (
  id uuid default uuid_generate_v4() primary key,
  attempt_id uuid references public.test_attempts(id) on delete cascade not null,
  question_id uuid references public.test_questions(id) on delete cascade not null,
  selected_answer text,
  is_correct boolean,
  ai_feedback text, -- For writing/speaking
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS
alter table public.mock_tests enable row level security;
create policy "Allow public read access to tests." on public.mock_tests for select using (true);

alter table public.test_questions enable row level security;
create policy "Allow authenticated read access to questions." on public.test_questions for select using (auth.role() = 'authenticated');

alter table public.test_attempts enable row level security;
create policy "Users can view their own attempts." on public.test_attempts for select using (auth.uid() = user_id);
create policy "Users can start their own attempts." on public.test_attempts for insert with check (auth.uid() = user_id);
create policy "Users can update their own attempts." on public.test_attempts for update using (auth.uid() = user_id);

alter table public.user_answers enable row level security;
create policy "Users can view their own answers." on public.user_answers for select 
  using (exists (select 1 from public.test_attempts where id = attempt_id and user_id = auth.uid()));
create policy "Users can insert their own answers." on public.user_answers for insert 
  with check (exists (select 1 from public.test_attempts where id = attempt_id and user_id = auth.uid()));

-- Indexes
create index idx_test_questions_test_id on public.test_questions(test_id);
create index idx_test_attempts_user_id on public.test_attempts(user_id);
create index idx_user_answers_attempt_id on public.user_answers(attempt_id);
