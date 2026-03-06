import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { SectionTitle } from "../components";
import { NewsItem } from "../data/types";
import { api } from "../api";
import { BG, BLUE, COLORS } from "../theme";

export const NewsScreen = ({ navigation }: any) => {
  const [news, setNews]       = useState<NewsItem[]>([]);
  const [liked, setLiked]     = useState<Record<number, boolean>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getNews().then(setNews).finally(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator style={s.loader} size="large" color={BLUE} />;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: BG }}>
      <Text style={s.appTitle}>Identities</Text>
      <View style={s.listPad}>
        <SectionTitle>一覧</SectionTitle>
        {news.map((item, i) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => navigation.navigate("NewsDetail", { item })}
            style={[s.newsRow, i < news.length - 1 && s.newsBorder]}
            activeOpacity={0.7}
          >
            <View style={[s.thumbnail, { backgroundColor: item.color }]}>
              <Text style={{ fontSize: 26 }}>📰</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={s.newsTitle}>{item.title}</Text>
              <View style={s.newsFooter}>
                <Text style={s.time}>{item.time}</Text>
                <TouchableOpacity onPress={() => setLiked(p => ({ ...p, [item.id]: !p[item.id] }))}>
                  <Text style={s.likeText}>❤️ いいね{item.likes + (liked[item.id] ? 1 : 0)}</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Text style={s.chevron}>›</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const s = StyleSheet.create({
  loader:    { flex: 1, marginTop: 80 },
  appTitle:  { fontSize: 22, fontWeight: "800", textAlign: "center", paddingTop: 16, paddingBottom: 8, letterSpacing: 0.5 },
  listPad:   { padding: 16 },
  newsRow:   { flexDirection: "row", gap: 12, paddingBottom: 14, marginBottom: 14, alignItems: "flex-start" },
  newsBorder:{ borderBottomWidth: 1, borderBottomColor: "#E8E8E8" },
  thumbnail: { width: 90, height: 68, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  newsTitle: { fontSize: 13, fontWeight: "600", lineHeight: 19, marginBottom: 8, flex: 1 },
  newsFooter:{ flexDirection: "row", alignItems: "center", gap: 14 },
  time:      { fontSize: 12, color: BLUE },
  likeText:  { fontSize: 12, color: COLORS.like },
  chevron:   { color: BLUE, fontSize: 22, marginLeft: 4 },
});
