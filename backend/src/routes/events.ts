import { Router } from "express";
import { supabase } from "../db/supabase";

const router = Router();

// GET /api/events
router.get("/", async (_req, res) => {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("date", { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// GET /api/events/:id
router.get("/:id", async (req, res) => {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", req.params.id)
    .single();
  if (error) return res.status(404).json({ error: "Not found" });
  res.json(data);
});

// PATCH /api/events/:id/register  → 参加登録トグル
router.patch("/:id/register", async (req, res) => {
  const { registered } = req.body as { registered: boolean };
  const { data, error } = await supabase
    .from("events")
    .update({ registered })
    .eq("id", req.params.id)
    .select()
    .single();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

export default router;
