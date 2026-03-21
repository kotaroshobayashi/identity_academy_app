// ─── 共通UIコンポーネント ─────────────────────────────────────────────────────
// アプリ全体で使い回す小さな部品。

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../theme";

// ── アバター（イニシャルアイコン）
interface AvatarProps {
  name:    string;
  size?:   number;
  color?:  string;
  radius?: number;
}
export const Avatar = ({ name, size = 64, color = COLORS.primary, radius = 12 }: AvatarProps) => (
  <View style={[s.avatar, { width: size, height: size, borderRadius: radius, backgroundColor: color }]}>
    <Text style={[s.avatarText, { fontSize: size * 0.38 }]}>{name.charAt(0)}</Text>
  </View>
);

// ── タグラベル（「起業」「28卒」など）
interface TagProps { label: string; outline?: boolean }
export const Tag = ({ label, outline = false }: TagProps) => (
  <View style={[s.tag, outline && s.tagOutline]}>
    <Text style={[s.tagText, outline && s.tagTextOutline]}>{label}</Text>
  </View>
);

// ── セクション見出し（青いバー付き）
interface SectionTitleProps { children: React.ReactNode }
export const SectionTitle = ({ children }: SectionTitleProps) => (
  <View style={s.sectionRow}>
    <View style={s.sectionBar} />
    <Text style={s.sectionLabel}>{children}</Text>
  </View>
);

// ── カード（白背景・影付きコンテナ）
interface CardProps { children: React.ReactNode; style?: object }
export const Card = ({ children, style }: CardProps) => (
  <View style={[s.card, style]}>{children}</View>
);

const s = StyleSheet.create({
  avatar:         { alignItems: "center", justifyContent: "center" },
  avatarText:     { color: "#fff", fontWeight: "700" },

  tag:            { backgroundColor: COLORS.primaryLight, borderRadius: 20, paddingVertical: 4, paddingHorizontal: 12, marginRight: 6, marginTop: 4 },
  tagText:        { color: COLORS.primary, fontSize: 12, fontWeight: "600" },
  tagOutline:     { backgroundColor: "transparent", borderWidth: 1.5, borderColor: COLORS.primary },
  tagTextOutline: { color: COLORS.primary },

  sectionRow:     { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 14 },
  sectionBar:     { width: 4, height: 22, backgroundColor: COLORS.primary, borderRadius: 2 },
  sectionLabel:   { fontSize: 18, fontWeight: "800", color: COLORS.text, letterSpacing: 0.3 },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    shadowColor: "#43BFBD",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 10,
  },
});
