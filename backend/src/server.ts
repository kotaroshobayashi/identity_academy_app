// ─── バックエンドAPIサーバー ──────────────────────────────────────────────────
// ポート 3001 で起動。フロントエンドから http://localhost:3001/api/* でアクセス
//
// 起動方法: npm run dev
// API一覧:
//   GET /api/members       → メンバー一覧
//   GET /api/members/:id   → メンバー詳細
//   GET /api/events        → イベント一覧
//   GET /api/events/:id    → イベント詳細
//   GET /api/news          → ニュース一覧
//   GET /api/news/:id      → ニュース詳細
//   GET /api/profile       → マイプロフィール

import express from "express";
import cors from "cors";
import membersRouter from "./routes/members";
import eventsRouter  from "./routes/events";
import newsRouter    from "./routes/news";
import profile       from "./data/profile.json";

const app  = express();
const PORT = 3001;

// ── ミドルウェア
app.use(cors());           // フロントエンドからのCORSを許可
app.use(express.json());   // JSONボディを解析

// ── ルート
app.use("/api/members", membersRouter);
app.use("/api/events",  eventsRouter);
app.use("/api/news",    newsRouter);
app.get("/api/profile", (_req, res) => res.json(profile));

// ── 起動
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
  console.log(`API: http://localhost:${PORT}/api/members`);
});
