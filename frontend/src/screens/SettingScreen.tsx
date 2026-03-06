import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { Avatar, Card, SectionTitle } from "../components";
import { Profile } from "../data/types";
import { api } from "../api";
import { BG, COLORS } from "../theme";

export const SettingScreen = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getProfile().then(setProfile).finally(() => setLoading(false));
  }, []);

  if (loading || !profile) return <ActivityIndicator style={s.loader} size="large" color={COLORS.primary} />;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: BG }} contentContainerStyle={s.listPad} showsVerticalScrollIndicator={false}>
      {/* プロフィールヒーローカード */}
      <View style={[s.heroCard, { borderTopColor: profile.color || COLORS.primary }]}>
        <Avatar name={profile.name} size={72} color={profile.color || COLORS.primary} radius={18} />
        <View style={{ flex: 1 }}>
          <Text style={s.profileName}>{profile.name}</Text>
          <View style={s.cohortBadge}>
            <Text style={s.cohortText}>{profile.cohort}</Text>
          </View>
        </View>
        <TouchableOpacity style={s.editBtn}>
          <Text style={s.editBtnText}>編集</Text>
        </TouchableOpacity>
      </View>

      {/* 基本情報 */}
      <SectionTitle>基本情報</SectionTitle>
      <Card style={{ padding: 16, marginBottom: 16 }}>
        <Text style={s.email}>{profile.email}</Text>
        {[
          ["📅", "生年月日", "未登録"],
          ["🎓", "大学",     "未登録"],
          ["🏃", "活動地域", "未登録"],
          ["🏠", "出身地",   "未登録"],
          ["💚", "LINE",     "未登録"],
          ["📱", "電話",     "未登録"],
          ["📸", "Instagram","未登録"],
        ].map(([icon, key, val], i) => (
          <View key={i} style={s.infoRow}>
            <Text style={s.infoIcon}>{icon}</Text>
            <Text style={s.infoKey}>{key}</Text>
            <Text style={s.infoVal}>{val}</Text>
          </View>
        ))}
      </Card>

      {/* 自己紹介 */}
      <SectionTitle>自己紹介</SectionTitle>
      <Card style={{ padding: 16, marginBottom: 24 }}>
        <Text style={s.bio}>{profile.bio}</Text>
      </Card>

      <TouchableOpacity style={s.logoutBtn}>
        <Text style={s.logoutText}>ログアウト</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const s = StyleSheet.create({
  loader:      { flex: 1, marginTop: 80 },
  listPad:     { padding: 16, paddingTop: 20 },

  heroCard:    {
    backgroundColor: "#fff", borderRadius: 16, padding: 16,
    flexDirection: "row", alignItems: "center", gap: 14, marginBottom: 24,
    borderTopWidth: 4,
    shadowColor: "#116DFF", shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08, shadowRadius: 8, elevation: 3,
  },
  profileName: { fontSize: 20, fontWeight: "800", color: COLORS.text, marginBottom: 6 },
  cohortBadge: { backgroundColor: COLORS.primaryLight, borderRadius: 20, paddingVertical: 4, paddingHorizontal: 12, alignSelf: "flex-start" },
  cohortText:  { fontSize: 12, fontWeight: "600", color: COLORS.primary },
  editBtn:     { borderWidth: 1.5, borderColor: COLORS.primary, borderRadius: 10, paddingVertical: 6, paddingHorizontal: 14 },
  editBtnText: { fontSize: 13, fontWeight: "700", color: COLORS.primary },

  email:       { fontSize: 14, color: COLORS.primary, marginBottom: 14, fontWeight: "500" },
  infoRow:     { flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: "#F5F5F8" },
  infoIcon:    { fontSize: 16, width: 24 },
  infoKey:     { fontSize: 13, color: COLORS.text, fontWeight: "600", width: 72 },
  infoVal:     { fontSize: 13, color: COLORS.subText, flex: 1 },

  bio:         { fontSize: 14, lineHeight: 24, color: COLORS.text },

  logoutBtn:   { borderWidth: 1.5, borderColor: "#E0E0E0", borderRadius: 12, paddingVertical: 14, alignItems: "center", backgroundColor: "#fff", marginBottom: 16 },
  logoutText:  { fontSize: 15, fontWeight: "600", color: "#E74C3C" },
});
