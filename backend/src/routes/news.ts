import { Router } from "express";
import news from "../data/news.json";

const router = Router();

// GET /api/news  → 全ニュース取得
router.get("/", (_req, res) => {
  res.json(news);
});

// GET /api/news/:id  → 特定ニュース取得
router.get("/:id", (req, res) => {
  const item = news.find(n => n.id === Number(req.params.id));
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
});

export default router;
