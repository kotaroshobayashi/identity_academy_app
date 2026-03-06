import { Router } from "express";
import events from "../data/events.json";

const router = Router();

// GET /api/events  → 全イベント取得
router.get("/", (_req, res) => {
  res.json(events);
});

// GET /api/events/:id  → 特定イベント取得
router.get("/:id", (req, res) => {
  const event = events.find(e => e.id === Number(req.params.id));
  if (!event) return res.status(404).json({ error: "Not found" });
  res.json(event);
});

export default router;
