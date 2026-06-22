# FrancaisPass Database Schema Documentation

This document describes the database architecture for FrancaisPass, designed for Supabase (PostgreSQL).

## Overview
The schema is built to support a high-scale EdTech platform with features for mock exams, AI tutoring, spaced repetition vocabulary learning, and community engagement.

## Core Modules

### 1. Authentication & Profiles
- **`profiles`**: Extends Supabase `auth.users`. Stores user-specific settings like `clb_target` and `preferred_exam`. 
- **Design Choice**: Uses a trigger to automatically create a profile row upon Supabase Auth signup.

### 2. Subscriptions (Stripe)
- **`subscriptions`**: Tracks the state of Stripe subscriptions.
- **`products` & `prices`**: Local cache of Stripe product data to minimize API calls during frontend rendering.
- **Design Choice**: Subscription IDs are text strings (matching Stripe IDs) for easy reconciliation.

### 3. Mock Exams
- **`mock_tests`**: Metadata for TEF/TCF exams.
- **`test_questions`**: Individual questions. Supports `jsonb` for flexible options/answers and `audio_url` for listening modules.
- **`test_attempts`**: Tracks user progress through a specific test.
- **`user_answers`**: Atomic record of every answer submitted by a user. Supports AI feedback for subjective modules (Writing/Speaking).

### 4. Spaced Repetition (SRS)
- **`vocabulary_words`**: A shared bank of 20,000+ French words.
- **`user_vocabulary`**: Junction table tracking individual user progress.
- **Design Choice**: Uses `ease_factor`, `interval`, and `repetitions` columns to implement an Anki-style SM-2 algorithm for efficient learning.

### 5. AI Features
- **`ai_tutor_conversations`**: Stores chat history with context types (e.g., 'exam_prep') for the personalized AI tutor.
- **`speaking_evaluations` & `writing_submissions`**: Stores detailed AI-generated feedback, including sub-scores for fluency, pronunciation, grammar, and coherence.

### 6. Community & News
- **`news_articles`**: Curated content for reading practice.
- **`study_groups` & `community_posts`**: Social layer for peer support.

### 7. Analytics & Tracking
- **`progress_tracking`**: Raw event log of all user activities.
- **`daily_stats`**: Aggregated view for high-performance dashboard rendering (streak tracking, minutes studied).

## Design Decisions

### Security (RLS)
Every table has **Row Level Security (RLS)** enabled. 
- Public data (Tests, Vocabulary, News) is `SELECT`able by everyone.
- Private data (Attempts, Profiles, Subscriptions) is restricted to the `auth.uid()` of the owner.
- Multi-tenant isolation is enforced at the database level.

### Performance
- **UUIDs**: All primary keys are UUID v4 for distributed systems compatibility.
- **Indexes**: Added on all Foreign Keys (`user_id`, `test_id`) and frequently filtered columns like `user_vocabulary.next_review`.
- **Cascading Deletes**: `ON DELETE CASCADE` is set on user-related data to ensure GDPR compliance/easy account deletion.

### AI Integration
- `JSONB` columns are used for `plan_data` in `study_plans` and `messages` in `ai_tutor_conversations` to allow schema flexibility as AI models evolve.

## File Structure
Files are located in `/home/team/shared/francaispass/database/`:
- `01_auth_profiles.sql`
- `02_subscriptions.sql`
- `03_tests.sql`
- `04_vocabulary.sql`
- `05_ai_features.sql`
- `06_community_and_news.sql`
- `07_tracking.sql`
