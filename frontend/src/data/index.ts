// ─── データ層 ─────────────────────────────────────────────────────────────────
// ハードコードデータは backend/src/data/*.json に移動した。
// フロントエンドからデータを取得する場合は src/api/index.ts を使う:
//   import { api } from "../api";
//   const members = await api.getMembers();

export * from "./types";
