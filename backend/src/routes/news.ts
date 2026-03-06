import { Router } from "express";
import { supabase } from "../db/supabase";

const router = Router();

// GET /api/news
router.get("/", async (_req, res) => {
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// GET /api/news/:id
router.get("/:id", async (req, res) => {
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .eq("id", req.params.id)
    .single();
  if (error) return res.status(404).json({ error: "Not found" });
  res.json(data);
});

// PATCH /api/news/:id/like  → いいね数を+1
router.patch("/:id/like", async (req, res) => {
  // 現在のlikes数を取得してインクリメント
  const { data: current, error: fetchErr } = await supabase
    .from("news")
    .select("likes")
    .eq("id", req.params.id)
    .single();
  if (fetchErr) return res.status(404).json({ error: "Not found" });

  const { data, error } = await supabase
    .from("news")
    .update({ likes: current.likes + 1 })
    .eq("id", req.params.id)
    .select()
    .single();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

export default router;
