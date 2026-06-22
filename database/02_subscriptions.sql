-- 02_subscriptions.sql

create type pricing_plan_interval as enum ('day', 'week', 'month', 'year');
create type subscription_status as enum ('trialing', 'active', 'canceled', 'incomplete', 'incomplete_expired', 'past_due', 'unpaid');

create table public.subscriptions (
  id text primary key,
  user_id uuid references public.profiles(id) not null,
  status subscription_status,
  metadata jsonb,
  price_id text,
  quantity integer,
  cancel_at_period_end boolean,
  created timestamp with time zone default timezone('utc'::text, now()) not null,
  current_period_start timestamp with time zone default timezone('utc'::text, now()) not null,
  current_period_end timestamp with time zone default timezone('utc'::text, now()) not null,
  ended_at timestamp with time zone default timezone('utc'::text, now()),
  cancel_at timestamp with time zone default timezone('utc'::text, now()),
  canceled_at timestamp with time zone default timezone('utc'::text, now()),
  trial_start timestamp with time zone default timezone('utc'::text, now()),
  trial_end timestamp with time zone default timezone('utc'::text, now())
);

alter table public.subscriptions enable row level security;

create policy "Can only view own subs data."
  on subscriptions for select
  using ( auth.uid() = user_id );

-- Create a table for products and prices to cache Stripe data
create table public.products (
  id text primary key,
  active boolean,
  name text,
  description text,
  image text,
  metadata jsonb
);

alter table public.products enable row level security;
create policy "Allow public read-only access." on public.products for select using (true);

create table public.prices (
  id text primary key,
  product_id text references public.products(id),
  active boolean,
  description text,
  unit_amount bigint,
  currency text check (char_length(currency) = 3),
  type text check (type in ('one_time', 'recurring')),
  interval pricing_plan_interval,
  interval_count integer,
  trial_period_days integer,
  metadata jsonb
);

alter table public.prices enable row level security;
create policy "Allow public read-only access." on public.prices for select using (true);
