// ─── テーマ・定数 ─────────────────────────────────────────────────────────────
// 色やスタイル定数をここで一元管理する
// 将来デザイン変更があればここだけ修正すればOK

export const COLORS = {
  primary:    "#1565C0",  // メインブルー
  background: "#F4F6F8",
  white:      "#ffffff",
  text:       "#333333",
  subText:    "#777777",
  border:     "#E0E0E0",
  like:       "#E91E63",
  success:    "#27AE60",
  gray:       "#9E9E9E",
};

// 後方互換のためのエイリアス（既存コードからの移行用）
export const BLUE = COLORS.primary;
export const BG   = COLORS.background;
