-- 04_vocabulary.sql

create table public.vocabulary_words (
  id uuid default uuid_generate_v4() primary key,
  word text not null unique,
  definition text,
  example_sentence text,
  audio_url text,
  difficulty_level text check (difficulty_level in ('a1', 'a2', 'b1', 'b2', 'c1', 'c2')),
  category text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.user_vocabulary (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  word_id uuid references public.vocabulary_words(id) on delete cascade not null,
  status text check (status in ('new', 'learning', 'mastered')) default 'new',
  interval integer default 0, -- Days until next review
  ease_factor float default 2.5,
  repetitions integer default 0,
  next_review timestamp with time zone default timezone('utc'::text, now()) not null,
  last_reviewed timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, word_id)
);

-- RLS
alter table public.vocabulary_words enable row level security;
create policy "Public vocabulary is readable." on public.vocabulary_words for select using (true);

alter table public.user_vocabulary enable row level security;
create policy "Users can manage their own vocabulary." on public.user_vocabulary
  using (auth.uid() = user_id);

-- Indexes
create index idx_user_vocabulary_user_id on public.user_vocabulary(user_id);
create index idx_user_vocabulary_next_review on public.user_vocabulary(next_review);
