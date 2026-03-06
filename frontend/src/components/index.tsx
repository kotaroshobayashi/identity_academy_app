// ─── 共通UIコンポーネント ─────────────────────────────────────────────────────
// アプリ全体で使い回す小さな部品。
// 新しいメンバーはここを読めばUIの共通パーツが全部わかる。

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { BLUE } from "../theme";

// ── アバター（イニシャルアイコン）
interface AvatarProps {
  name:    string;
  size?:   number;
  color?:  string;
  radius?: number;
}
export const Avatar = ({ name, size = 64, color = BLUE, radius = 10 }: AvatarProps) => (
  <View style={[s.avatar, { width: size, height: size, borderRadius: radius, backgroundColor: color }]}>
    <Text style={[s.avatarText, { fontSize: size * 0.38 }]}>{name.charAt(0)}</Text>
  </View>
);

// ── タグラベル（「起業」「28卒」など）
interface TagProps { label: string }
export const Tag = ({ label }: TagProps) => (
  <View style={s.tag}><Text style={s.tagText}>{label}</Text></View>
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
  avatar:       { alignItems: "center", justifyContent: "center" },
  avatarText:   { color: "#fff", fontWeight: "700" },
  tag:          { backgroundColor: BLUE, borderRadius: 14, paddingVertical: 3, paddingHorizontal: 12, marginRight: 6, marginTop: 4 },
  tagText:      { color: "#fff", fontSize: 12, fontWeight: "500" },
  sectionRow:   { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 14 },
  sectionBar:   { width: 4, height: 22, backgroundColor: BLUE, borderRadius: 2 },
  sectionLabel: { fontSize: 20, fontWeight: "700" },
  card:         { backgroundColor: "#fff", borderRadius: 14, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 2, marginBottom: 10 },
});
