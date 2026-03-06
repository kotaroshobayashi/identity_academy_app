import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { Card, SectionTitle } from "../components";
import { Event } from "../data/types";
import { api } from "../api";
import { BG, COLORS } from "../theme";

export const EventScreen = ({ navigation }: any) => {
  const [events, setEvents]   = useState<Event[]>([]);
  const [tab, setTab]         = useState<"upcoming" | "all">("upcoming");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getEvents().then(setEvents).finally(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator style={s.loader} size="large" color={COLORS.primary} />;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: BG }} showsVerticalScrollIndicator={false}>
      {/* タブ */}
      <View style={s.tabBar}>
        {(["upcoming", "all"] as const).map((t, i) => (
          <TouchableOpacity key={t} onPress={() => setTab(t)} style={[s.tabBtn, tab === t && s.tabBtnActive]}>
            <Text style={[s.tabLabel, tab === t && s.tabLabelActive]}>{i === 0 ? "開催予定" : "すべて"}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={s.listPad}>
        <SectionTitle>イベント一覧</SectionTitle>
        {events.map(ev => (
          <View key={ev.id} style={s.timelineRow}>
            <View style={s.timelineTrack}>
              <View style={[s.timelineDot, { backgroundColor: ev.accent || COLORS.primary }]} />
              <View style={s.timelineLine} />
            </View>
            <View style={{ flex: 1, paddingBottom: 20 }}>
              <Text style={s.evDate}>{ev.date}</Text>
              <TouchableOpacity onPress={() => navigation.navigate("EventDetail", { event: ev })} activeOpacity={0.85}>
                <Card style={{ padding: 14 }}>
                  <Text style={s.evTitle}>{ev.title}</Text>
                  <View style={s.evMetaRow}>
                    <Text style={s.evMeta}>🕐 {ev.time}</Text>
                    <Text style={s.evMeta}>👤 {ev.organizer}</Text>
                  </View>
                  <View style={[s.regBtn, ev.registered
                    ? { backgroundColor: "#E8F5E9", borderColor: "#A5D6A7" }
                    : { backgroundColor: COLORS.primaryLight, borderColor: COLORS.primary }
                  ]}>
                    <Text style={[s.regText, { color: ev.registered ? "#2E7D32" : COLORS.primary }]}>
                      {ev.registered ? "✓ 参加登録済み" : "参加登録する →"}
                    </Text>
                  </View>
                </Card>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const s = StyleSheet.create({
  loader:        { flex: 1, marginTop: 80 },

  tabBar:        { flexDirection: "row", backgroundColor: "#fff", paddingHorizontal: 16, paddingTop: 12, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: "#F0F0F5" },
  tabBtn:        { paddingVertical: 8, paddingHorizontal: 18, borderRadius: 20, marginRight: 8, backgroundColor: COLORS.background },
  tabBtnActive:  { backgroundColor: COLORS.primary },
  tabLabel:      { fontSize: 13, fontWeight: "600", color: COLORS.subText },
  tabLabelActive:{ color: "#fff" },

  listPad:       { padding: 16, paddingTop: 20 },

  timelineRow:   { flexDirection: "row", gap: 14 },
  timelineTrack: { alignItems: "center", width: 18 },
  timelineDot:   { width: 14, height: 14, borderRadius: 7, marginTop: 20 },
  timelineLine:  { flex: 1, width: 2, backgroundColor: "#E8EAF0", marginTop: 4 },

  evDate:        { fontSize: 12, color: COLORS.subText, fontWeight: "600", marginBottom: 6, letterSpacing: 0.5 },
  evTitle:       { fontSize: 15, fontWeight: "800", color: COLORS.text, marginBottom: 8, lineHeight: 22 },
  evMetaRow:     { flexDirection: "row", gap: 16, marginBottom: 10 },
  evMeta:        { fontSize: 12, color: COLORS.subText },

  regBtn:        { borderWidth: 1.5, borderRadius: 10, paddingVertical: 8, paddingHorizontal: 14, alignSelf: "flex-start" },
  regText:       { fontSize: 13, fontWeight: "700" },
});
