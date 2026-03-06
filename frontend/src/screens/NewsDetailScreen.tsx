import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, StyleSheet } from "react-native";
import { Card, SectionTitle } from "../components";
import { BG, BLUE, COLORS } from "../theme";

export const NewsDetailScreen = ({ route }: any) => {
  const item = route.params?.item;
  const [liked, setLiked] = useState(false);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: BG }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* サムネイル */}
        <View style={[s.banner, { backgroundColor: item.color }]}>
          <Text style={{ fontSize: 48 }}>📰</Text>
        </View>

        {/* タイトル */}
        <Card style={{ padding: 16, marginBottom: 16 }}>
          <Text style={s.newsTitle}>{item.title}</Text>
          <View style={s.metaRow}>
            <Text style={s.time}>{item.time}</Text>
            <TouchableOpacity onPress={() => setLiked(!liked)}>
              <Text style={s.likeText}>❤️ いいね {item.likes + (liked ? 1 : 0)}</Text>
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
  bio:       { fontSize: 14, lineHeight: 24, color: "#333" },
});
