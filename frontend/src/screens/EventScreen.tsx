import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { Card, SectionTitle } from "../components";
import { Event } from "../data/types";
import { api } from "../api";
import { BG, BLUE } from "../theme";

export const EventScreen = ({ navigation }: any) => {
  const [events, setEvents]   = useState<Event[]>([]);
  const [tab, setTab]         = useState<"upcoming" | "all">("upcoming");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getEvents().then(setEvents).finally(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator style={s.loader} size="large" color={BLUE} />;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: BG }}>
      <View style={s.header}>
        <Text style={s.appTitle}>Identities</Text>
        <SectionTitle>Events</SectionTitle>
        <View style={s.tabRow}>
          {(["upcoming", "all"] as const).map((t, i) => (
            <TouchableOpacity key={t} onPress={() => setTab(t)} style={[s.tabBtn, tab === t && s.tabBtnActive]}>
              <Text style={[s.tabLabel, tab === t && s.tabLabelActive]}>{i === 0 ? "開催予定" : "すべてのイベント"}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={s.listPad}>
        {events.map(ev => (
          <View key={ev.id} style={s.timelineRow}>
            <View style={s.timelineDot} />
            <View style={{ flex: 1 }}>
              <Text style={s.evDate}>{ev.date}</Text>
              <Text style={s.evTitle}>{ev.title}</Text>
              <TouchableOpacity onPress={() => navigation.navigate("EventDetail", { event: ev })} activeOpacity={0.8}>
                <Card style={{ padding: 14 }}>
                  <Text style={s.evMeta}>開催時刻：{ev.time}</Text>
                  <View style={s.evFooter}>
                    <Text style={s.evMeta}>主催：{ev.organizer}</Text>
                    <Text style={{ color: BLUE, fontSize: 20 }}>›</Text>
                  </View>
                  <View style={[s.regBtn, { backgroundColor: ev.registered ? "#E8F5E9" : "#E3F2FD" }]}>
                    <Text style={[s.regText, { color: ev.registered ? "#2E7D32" : BLUE }]}>
                      {ev.registered ? "✓ 参加登録済" : "参加登録する"}
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
  loader:      { flex: 1, marginTop: 80 },
  appTitle:    { fontSize: 22, fontWeight: "800", textAlign: "center", paddingTop: 16, paddingBottom: 8, letterSpacing: 0.5 },
  header:      { backgroundColor: "#fff", paddingHorizontal: 16, paddingBottom: 0 },
  listPad:     { padding: 16 },
  tabRow:      { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#E0E0E0" },
  tabBtn:      { flex: 1, paddingVertical: 10, alignItems: "center", borderBottomWidth: 2, borderBottomColor: "transparent" },
  tabBtnActive:{ borderBottomColor: BLUE },
  tabLabel:    { fontSize: 14, fontWeight: "700", color: "#999" },
  tabLabelActive:{ color: BLUE },
  timelineRow: { flexDirection: "row", gap: 14, marginBottom: 24 },
  timelineDot: { width: 14, height: 14, borderRadius: 7, backgroundColor: "#A0A0A0", marginTop: 4 },
  evDate:      { fontSize: 13, color: "#9E9E9E", marginBottom: 4 },
  evTitle:     { fontSize: 16, fontWeight: "700", marginBottom: 8 },
  evMeta:      { fontSize: 13, color: "#555", marginBottom: 4 },
  evFooter:    { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  regBtn:      { marginTop: 10, paddingVertical: 6, paddingHorizontal: 14, borderRadius: 8, alignSelf: "flex-start" },
  regText:     { fontSize: 12, fontWeight: "600" },
});
