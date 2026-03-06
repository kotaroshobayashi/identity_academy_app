import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { SectionTitle } from "../components";
import { NewsItem } from "../data/types";
import { api } from "../api";
import { COLORS, BG, BLUE } from "../theme";

export const NewsScreen = ({ navigation }: any) => {
  const [news, setNews]       = useState<NewsItem[]>([]);
  const [liked, setLiked]     = useState<Record<number, boolean>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getNews().then(setNews).finally(() => setLoading(false));
  }, []);

  const handleLike = async (item: NewsItem) => {
    if (liked[item.id]) return;
    setLiked(p => ({ ...p, [item.id]: true }));
    try {
      const updated = await api.likeNews(item.id);
      setNews(prev => prev.map(n => n.id === item.id ? updated : n));
    } catch {
      setLiked(p => ({ ...p, [item.id]: false }));
    }
  };

  if (loading) return <ActivityIndicator style={s.loader} size="large" color={BLUE} />;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: BG }} showsVerticalScrollIndicator={false}>
      <View style={s.listPad}>
        <SectionTitle>最新ニュース</SectionTitle>
        {news.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => navigation.navigate("NewsDetail", { item })}
            activeOpacity={0.85}
          >
            <View style={s.card}>
              {/* サムネイル */}
              {item.image_url ? (
                <Image source={{ uri: item.image_url }} style={s.thumbnail} />
              ) : (
                <View style={[s.thumbnail, { backgroundColor: item.color }]}>
                  <Text style={s.thumbnailEmoji}>📰</Text>
                </View>
              )}
              {/* コンテンツ */}
              <View style={s.cardBody}>
                <Text style={s.newsTitle} numberOfLines={2}>{item.title}</Text>
                <View style={s.cardFooter}>
                  <Text style={s.time}>{item.time}</Text>
                  <TouchableOpacity onPress={() => handleLike(item)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                    <View style={[s.likeChip, liked[item.id] && s.likeChipActive]}>
                      <Text style={[s.likeText, liked[item.id] && s.likeTextActive]}>
                        ♥  {item.likes}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={s.chevron}>›</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const s = StyleSheet.create({
  loader:        { flex: 1, marginTop: 80 },
  listPad:       { padding: 16, paddingTop: 20 },

  card:          {
    flexDirection: "row", alignItems: "center", gap: 12,
    backgroundColor: "#fff", borderRadius: 16, padding: 12, marginBottom: 12,
    shadowColor: "#116DFF", shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07, shadowRadius: 8, elevation: 3,
  },
  thumbnail:     { width: 88, height: 66, borderRadius: 12, alignItems: "center", justifyContent: "center", flexShrink: 0 },
  thumbnailEmoji:{ fontSize: 28 },
  cardBody:      { flex: 1, gap: 8 },
  newsTitle:     { fontSize: 13, fontWeight: "700", lineHeight: 19, color: COLORS.text },
  cardFooter:    { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  time:          { fontSize: 11, color: COLORS.subText },

  likeChip:      { flexDirection: "row", alignItems: "center", backgroundColor: COLORS.primaryLight, paddingVertical: 4, paddingHorizontal: 10, borderRadius: 20 },
  likeChipActive:{ backgroundColor: "#FFEEF5" },
  likeText:      { fontSize: 12, fontWeight: "600", color: COLORS.primary },
  likeTextActive:{ color: COLORS.like },

  chevron:       { color: COLORS.gray, fontSize: 20, marginLeft: 2 },
});
