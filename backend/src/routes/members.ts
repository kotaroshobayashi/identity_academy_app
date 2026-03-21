import { Router } from "express";
import { supabase } from "../db/supabase";

const router = Router();

// GET /api/members
router.get("/", async (_req, res) => {
  const { data, error } = await supabase
    .from("members")
    .select("*")
    .order("id");
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// GET /api/members/:id
router.get("/:id", async (req, res) => {
  const { data, error } = await supabase
    .from("members")
    .select("*")
    .eq("id", req.params.id)
    .single();
  if (error) return res.status(404).json({ error: "Not found" });
  res.json(data);
});

export default router;
