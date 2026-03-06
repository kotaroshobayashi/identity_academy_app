import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { Avatar, Card, SectionTitle } from "../components";
import { Profile } from "../data/types";
import { api } from "../api";
import { BG, BLUE } from "../theme";

export const SettingScreen = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getProfile().then(setProfile).finally(() => setLoading(false));
  }, []);

  if (loading || !profile) return <ActivityIndicator style={s.loader} size="large" color={BLUE} />;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: BG }} contentContainerStyle={s.listPad}>
      <Card style={s.profileCard}>
        <Avatar name={profile.name} size={80} color={profile.color} radius={14} />
        <View style={{ flex: 1 }}>
          <Text style={s.profileName}>{profile.name}</Text>
          <Text style={s.memberSub}>{profile.cohort}</Text>
        </View>
      </Card>

      <SectionTitle>基本情報</SectionTitle>
      <Card style={{ padding: 16, marginBottom: 16 }}>
        <Text style={s.email}>{profile.email}</Text>
        {[
          ["📅", "生年月日未登録"], ["🎓", "大学未登録"],
          ["🏃", "活動地域未登録"], ["🏠", "出身地未登録"],
          ["💚", "LINE 未登録"],   ["🏫", "高校：未登録"],
          ["📱", "電話 未登録"],   ["📸", "Instagram 未登録"],
        ].map(([icon, label], i) => (
          <Text key={i} style={s.infoItem}>{icon} {label}</Text>
        ))}
      </Card>

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
  listPad:     { padding: 16 },
  profileCard: { padding: 16, flexDirection: "row", alignItems: "center", gap: 14, marginBottom: 16 },
  profileName: { fontSize: 22, fontWeight: "800", marginBottom: 4 },
  memberSub:   { fontSize: 13, color: "#777" },
  email:       { fontSize: 14, color: BLUE, textDecorationLine: "underline", marginBottom: 12 },
  infoItem:    { fontSize: 13, color: "#777", marginBottom: 10 },
  bio:         { fontSize: 14, lineHeight: 24, color: "#333" },
  logoutBtn:   { borderWidth: 1.5, borderColor: "#E0E0E0", borderRadius: 12, paddingVertical: 13, alignItems: "center", backgroundColor: "#fff" },
  logoutText:  { fontSize: 15, fontWeight: "600", color: "#E74C3C" },
});
