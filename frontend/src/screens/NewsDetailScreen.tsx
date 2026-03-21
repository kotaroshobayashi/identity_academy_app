import React, { useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, SafeAreaView, StyleSheet } from "react-native";
import { Card, SectionTitle } from "../components";
import { api } from "../api";
import { BG, BLUE, COLORS } from "../theme";

export const NewsDetailScreen = ({ route }: any) => {
  const item = route.params?.item;
  const [likes, setLikes] = useState<number>(item.likes);
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    if (liked) return;
    setLiked(true);
    try {
      const updated = await api.likeNews(item.id);
      setLikes(updated.likes);
    } catch {
      setLiked(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: BG }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* バナー画像 or カラープレースホルダー */}
        {item.image_url ? (
          <Image source={{ uri: item.image_url }} style={s.banner} />
        ) : (
          <View style={[s.banner, { backgroundColor: item.color }]}>
            <Text style={{ fontSize: 48 }}>📰</Text>
          </View>
        )}

        {/* タイトル */}
        <Card style={{ padding: 16, marginBottom: 16 }}>
          <Text style={s.newsTitle}>{item.title}</Text>
          <View style={s.metaRow}>
            <Text style={s.time}>{item.time}</Text>
            <TouchableOpacity onPress={handleLike}>
              <Text style={[s.likeText, liked && s.likedText]}>❤️ いいね {likes}</Text>
            </TouchableOpacity>
          </View>
        </Card>

        {/* 本文 */}
        <SectionTitle>記事内容</SectionTitle>
        <Card style={{ padding: 16, marginBottom: 24 }}>
          <Text style={s.bio}>{item.body}</Text>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const s = StyleSheet.create({
  banner:    { height: 180, borderRadius: 14, alignItems: "center", justifyContent: "center", marginBottom: 16 },
  newsTitle: { fontSize: 16, fontWeight: "700", lineHeight: 24, marginBottom: 10 },
  metaRow:   { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  time:      { fontSize: 12, color: BLUE },
  likeText:  { fontSize: 12, color: COLORS.like },
  likedText: { opacity: 0.5 },
  bio:       { fontSize: 14, lineHeight: 24, color: "#333" },
});
