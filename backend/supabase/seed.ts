// ─── シードスクリプト ─────────────────────────────────────────────────────────
// JSONファイルのデータをSupabaseに一括投入する。
// 実行: npx ts-node supabase/seed.ts
//
// ※ テーブルが存在しない場合は先に migration.sql を Supabase SQL Editor で実行すること

import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import members from "../src/data/members.json";
import events  from "../src/data/events.json";
import news    from "../src/data/news.json";
import profile from "../src/data/profile.json";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

async function seed() {
  console.log("🌱 Seeding Supabase...\n");

  // members
  const { error: e1 } = await supabase.from("members").insert(
    members.map(({ id: _id, ...m }) => m)   // id は SERIAL で自動採番
  );
  if (e1) { console.error("❌ members:", e1.message); }
  else     { console.log(`✅ members: ${members.length}件 投入完了`); }

  // events
  const { error: e2 } = await supabase.from("events").insert(
    events.map(({ id: _id, ...e }) => e)
  );
  if (e2) { console.error("❌ events:", e2.message); }
  else     { console.log(`✅ events:  ${events.length}件 投入完了`); }

  // news
  const { error: e3 } = await supabase.from("news").insert(
    news.map(({ id: _id, ...n }) => n)
  );
  if (e3) { console.error("❌ news:", e3.message); }
  else     { console.log(`✅ news:    ${news.length}件 投入完了`); }

  // profile（1件だけ）
  const { name, cohort, email, color, bio } = profile;
  const { error: e4 } = await supabase.from("profile").insert({ name, cohort, email, color, bio });
  if (e4) { console.error("❌ profile:", e4.message); }
  else     { console.log(`✅ profile: 1件 投入完了`); }

  console.log("\n✨ シード完了");
}

seed();
