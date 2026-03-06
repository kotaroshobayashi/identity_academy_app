import { Router } from "express";
import members from "../data/members.json";

const router = Router();

// GET /api/members  → 全メンバー取得
router.get("/", (_req, res) => {
  res.json(members);
});

// GET /api/members/:id  → 特定メンバー取得
router.get("/:id", (req, res) => {
  const member = members.find(m => m.id === Number(req.params.id));
  if (!member) return res.status(404).json({ error: "Not found" });
  res.json(member);
});

export default router;
