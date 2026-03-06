import React from "react";
import { View, Text, ScrollView, SafeAreaView, StyleSheet } from "react-native";
import { Avatar, Card, SectionTitle, Tag } from "../components";
import { BG } from "../theme";

export const MemberDetailScreen = ({ route }: any) => {
  const member = route.params?.member;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: BG }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* ヘッダー */}
        <Card style={{ padding: 20, alignItems: "center", marginBottom: 16 }}>
          <Avatar name={member.name} size={96} color={member.color} radius={48} />
          <Text style={[s.profileName, { marginTop: 12, textAlign: "center" }]}>{member.name}</Text>
          <Text style={[s.memberSub, { textAlign: "center" }]}>{member.cohort}</Text>
          {member.university ? <Text style={[s.memberSub, { textAlign: "center" }]}>{member.university}</Text> : null}
          {member.tags.length > 0 && (
            <View style={[s.tagRow, { justifyContent: "center", marginTop: 8 }]}>
              {member.tags.map((tag: string) => <Tag key={tag} label={tag} />)}
            </View>
          )}
        </Card>

        {/* 基本情報 */}
        <SectionTitle>基本情報</SectionTitle>
        <Card style={{ padding: 16, marginBottom: 16 }}>
          {[
            ["📅", "生年月日", "未登録"],
            ["🎓", "大学",     member.university || "未登録"],
            ["🏃", "活動地域", "未登録"],
            ["💚", "LINE",     "未登録"],
            ["📱", "電話",     "未登録"],
            ["📸", "Instagram","未登録"],
          ].map(([icon, label, value], i) => (
            <View key={i} style={s.infoRow}>
              <Text style={s.infoIcon}>{icon}</Text>
              <Text style={s.infoLabel}>{label}</Text>
              <Text style={s.infoValue}>{value}</Text>
            </View>
          ))}
        </Card>

        {/* 自己紹介 */}
        <SectionTitle>自己紹介</SectionTitle>
        <Card style={{ padding: 16, marginBottom: 24 }}>
          <Text style={s.bio}>{member.bio}</Text>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const s = StyleSheet.create({
  profileName: { fontSize: 22, fontWeight: "800", marginBottom: 4 },
  memberSub:   { fontSize: 13, color: "#777" },
  tagRow:      { flexDirection: "row", flexWrap: "wrap", marginTop: 4 },
  infoRow:     { flexDirection: "row", alignItems: "center", paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: "#F0F0F0" },
  infoIcon:    { fontSize: 18, width: 28 },
  infoLabel:   { fontSize: 13, color: "#999", width: 72 },
  infoValue:   { fontSize: 13, color: "#333", flex: 1 },
  bio:         { fontSize: 14, lineHeight: 24, color: "#333" },
});
