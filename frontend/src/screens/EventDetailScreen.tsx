import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, StyleSheet } from "react-native";
import { Card, SectionTitle } from "../components";
import { BG, BLUE } from "../theme";

export const EventDetailScreen = ({ route }: any) => {
  const event = route.params?.event;
  const [registered, setRegistered] = useState(event.registered);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: BG }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* バナー */}
        <View style={[s.banner, { backgroundColor: event.accent }]}>
          <Text style={{ fontSize: 48 }}>🎯</Text>
        </View>

        <Card style={{ padding: 16, marginBottom: 16 }}>
          <Text style={s.evDate}>{event.date}</Text>
          <Text style={s.evTitle}>{event.title}</Text>
        </Card>

        {/* イベント情報 */}
        <SectionTitle>イベント情報</SectionTitle>
        <Card style={{ padding: 16, marginBottom: 16 }}>
          {[
            ["🕐", "開催時刻", event.time],
            ["👤", "主催者",   event.organizer],
            ["📍", "場所",     "未定"],
          ].map(([icon, label, value], i) => (
            <View key={i} style={s.infoRow}>
              <Text style={s.infoIcon}>{icon}</Text>
              <Text style={s.infoLabel}>{label}</Text>
              <Text style={s.infoValue}>{value}</Text>
            </View>
          ))}
        </Card>

        {/* 詳細説明 */}
        <SectionTitle>詳細</SectionTitle>
        <Card style={{ padding: 16, marginBottom: 24 }}>
          <Text style={s.bio}>{event.description}</Text>
        </Card>

        {/* 参加登録ボタン */}
        <TouchableOpacity
          onPress={() => setRegistered(!registered)}
          style={[s.primaryBtn, { backgroundColor: registered ? "#9E9E9E" : BLUE }]}
        >
          <Text style={s.primaryBtnText}>{registered ? "✓ 参加登録済み" : "参加登録する"}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const s = StyleSheet.create({
  banner:       { height: 140, borderRadius: 14, alignItems: "center", justifyContent: "center", marginBottom: 16 },
  evDate:       { fontSize: 13, color: "#9E9E9E", marginBottom: 4 },
  evTitle:      { fontSize: 18, fontWeight: "700", lineHeight: 26 },
  infoRow:      { flexDirection: "row", alignItems: "center", paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: "#F0F0F0" },
  infoIcon:     { fontSize: 18, width: 28 },
  infoLabel:    { fontSize: 13, color: "#999", width: 72 },
  infoValue:    { fontSize: 13, color: "#333", flex: 1 },
  bio:          { fontSize: 14, lineHeight: 24, color: "#333" },
  primaryBtn:   { borderRadius: 12, paddingVertical: 14, alignItems: "center", marginBottom: 24 },
  primaryBtnText:{ color: "#fff", fontSize: 16, fontWeight: "700" },
});
