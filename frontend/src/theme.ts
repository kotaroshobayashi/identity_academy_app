// ─── テーマ・定数 ─────────────────────────────────────────────────────────────
// Identity Academy ブランドDNA
//   Primary (teal): #43BFBD
//   Dark:           #222120
//   White:          #ffffff

export const COLORS = {
  primary:      "#43BFBD",  // ブランドティール
  primaryDark:  "#33AFAD",  // 濃いティール（押下・グラデ等）
  primaryLight: "#E6F8F8",  // 淡いティール（チップ背景等）
  background:   "#F7FEFE",  // 全画面背景（ほぼ白、ティール微感）
  white:        "#ffffff",
  text:         "#222120",  // ブランドダークチャコール（見出し・本文）
  subText:      "#6B7280",
  border:       "#E2ECEC",
  like:         "#E91E63",
  success:      "#10B981",
  gray:         "#9CA3AF",
  dark:         "#222120",  // text の別名
};

// 後方互換エイリアス
export const BLUE = COLORS.primary;
export const BG   = COLORS.background;
