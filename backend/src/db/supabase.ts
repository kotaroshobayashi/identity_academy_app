// ─── Supabaseクライアント ─────────────────────────────────────────────────────
// このファイルをimportするだけでSupabaseに接続できる。
// 接続情報は .env で管理（GitHubには上げない）。

import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_KEY;

if (!url || !key) {
  throw new Error("Missing SUPABASE_URL or SUPABASE_KEY in .env");
}

export const supabase = createClient(url, key);
