/* ================================================================
   Supabase 設定
   以下の2つをSupabaseダッシュボードの「Project Settings > API」から取得して設定してください
================================================================ */

const SUPABASE_URL = 'https://pzowbfskhiekprdlgfsv.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6b3diZnNraGlla3ByZGxnZnN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE2ODE5MTgsImV4cCI6MjA5NzI1NzkxOH0.PpakU9kPR_tavp16ai9Nm5ORa6KMKuW9xmNlXXntxFQ';

/* ----------------------------------------------------------------
   テーブル作成SQL（Supabase SQL Editor で実行）:

   CREATE TABLE contact_submissions (
     id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
     created_at timestamptz DEFAULT now(),
     service text NOT NULL,
     name text NOT NULL,
     company text,
     email text NOT NULL,
     service_type text,
     message text
   );

   ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

   -- 誰でも送信可
   CREATE POLICY "allow_insert" ON contact_submissions
     FOR INSERT TO anon WITH CHECK (true);

   -- 認証済みユーザーのみ閲覧可
   CREATE POLICY "allow_select" ON contact_submissions
     FOR SELECT TO authenticated USING (true);
---------------------------------------------------------------- */

const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
