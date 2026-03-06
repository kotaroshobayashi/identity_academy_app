-- ─── Identities App — テーブル定義 ──────────────────────────────────────────
-- Supabase ダッシュボード → SQL Editor に貼り付けて実行する
-- https://supabase.com/dashboard/project/cjuazpuerpsqiokvoghr/sql

-- ── メンバー
CREATE TABLE IF NOT EXISTS members (
  id          SERIAL PRIMARY KEY,
  name        TEXT NOT NULL,
  cohort      TEXT DEFAULT '',
  university  TEXT DEFAULT '',
  tags        TEXT[] DEFAULT '{}',
  color       TEXT DEFAULT '#1565C0',
  bio         TEXT DEFAULT '',
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── イベント
CREATE TABLE IF NOT EXISTS events (
  id          SERIAL PRIMARY KEY,
  date        TEXT,
  title       TEXT NOT NULL,
  time        TEXT DEFAULT '',
  organizer   TEXT DEFAULT '',
  registered  BOOLEAN DEFAULT FALSE,
  accent      TEXT DEFAULT '#1565C0',
  description TEXT DEFAULT '',
  location    TEXT DEFAULT '',
  external_url TEXT DEFAULT '',
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── ニュース（タイムライン）
CREATE TABLE IF NOT EXISTS news (
  id          SERIAL PRIMARY KEY,
  title       TEXT NOT NULL,
  time        TEXT DEFAULT '',
  likes       INTEGER DEFAULT 0,
  color       TEXT DEFAULT '#2C3E50',
  body        TEXT DEFAULT '',
  image_url   TEXT DEFAULT '',
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── プロフィール（マイページ）
CREATE TABLE IF NOT EXISTS profile (
  id          SERIAL PRIMARY KEY,
  name        TEXT NOT NULL,
  cohort      TEXT DEFAULT '',
  email       TEXT DEFAULT '',
  color       TEXT DEFAULT '#607D8B',
  bio         TEXT DEFAULT '',
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── RLS（Row Level Security）を一旦無効化 — 開発中は全員読み書き可
ALTER TABLE members  DISABLE ROW LEVEL SECURITY;
ALTER TABLE events   DISABLE ROW LEVEL SECURITY;
ALTER TABLE news     DISABLE ROW LEVEL SECURITY;
ALTER TABLE profile  DISABLE ROW LEVEL SECURITY;
