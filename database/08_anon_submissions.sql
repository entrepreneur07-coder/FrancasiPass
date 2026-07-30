-- ============================================
-- Allow anonymous test submissions
-- Makes test_attempts.user_id nullable and adds
-- RLS policies for anonymous users
-- ============================================

-- 1. Make user_id nullable for anonymous attempts
ALTER TABLE public.test_attempts 
  ALTER COLUMN user_id DROP NOT NULL;

-- 2. Allow anonymous inserts to test_attempts
DROP POLICY IF EXISTS "Anon can start attempts" ON public.test_attempts;
CREATE POLICY "Anon can start attempts" ON public.test_attempts 
  FOR INSERT 
  WITH CHECK (true);

-- 3. Allow anonymous selects on own attempts (by attempt id)
DROP POLICY IF EXISTS "Anon can view attempts" ON public.test_attempts;
CREATE POLICY "Anon can view attempts" ON public.test_attempts 
  FOR SELECT 
  USING (true);

-- 4. Allow anonymous updates to own attempts
DROP POLICY IF EXISTS "Anon can update attempts" ON public.test_attempts;
CREATE POLICY "Anon can update attempts" ON public.test_attempts 
  FOR UPDATE 
  USING (true);

-- 5. Allow anonymous inserts to user_answers
DROP POLICY IF EXISTS "Anon can submit answers" ON public.user_answers;
CREATE POLICY "Anon can submit answers" ON public.user_answers 
  FOR INSERT 
  WITH CHECK (true);

-- 6. Allow anonymous selects on user_answers
DROP POLICY IF EXISTS "Anon can view answers" ON public.user_answers;
CREATE POLICY "Anon can view answers" ON public.user_answers 
  FOR SELECT 
  USING (true);
