// ─── バックエンドAPIサーバー ──────────────────────────────────────────────────
// ポート 3001 で起動。フロントエンドから http://localhost:3001/api/* でアクセス
//
// 起動方法: npm run dev
// API一覧:
//   GET    /api/members             → メンバー一覧
//   GET    /api/members/:id         → メンバー詳細
//   GET    /api/events              → イベント一覧
//   GET    /api/events/:id          → イベント詳細
//   PATCH  /api/events/:id/register → 参加登録トグル
//   GET    /api/news                → ニュース一覧
//   GET    /api/news/:id            → ニュース詳細
//   PATCH  /api/news/:id/like       → いいね+1
//   GET    /api/profile             → マイプロフィール

import "dotenv/config";
import express from "express";
import cors from "cors";
import membersRouter from "./routes/members";
import eventsRouter  from "./routes/events";
import newsRouter    from "./routes/news";
import { supabase }  from "./db/supabase";

const app  = express();
const PORT = Number(process.env.PORT) || 3001;

// ── ミドルウェア
app.use(cors());
app.use(express.json());

// ── ルート
app.use("/api/members", membersRouter);
app.use("/api/events",  eventsRouter);
app.use("/api/news",    newsRouter);

// /api/profile → Supabaseから取得
app.get("/api/profile", async (_req, res) => {
  const { data, error } = await supabase
    .from("profile")
    .select("*")
    .order("id")
    .limit(1)
    .single();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// ── 起動
app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
  console.log(`   Supabase: ${process.env.SUPABASE_URL}`);
});
