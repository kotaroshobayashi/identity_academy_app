import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, StyleSheet } from "react-native";
import { Avatar, Card, Tag } from "../components";
import { Member } from "../data/types";
import { api } from "../api";
import { BG, BLUE } from "../theme";

export const MemberScreen = ({ navigation }: any) => {
  const [members, setMembers] = useState<Member[]>([]);
  const [search, setSearch]   = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getMembers().then(setMembers).finally(() => setLoading(false));
  }, []);

  const filtered = members.filter(m =>
    m.name.includes(search) || m.university.includes(search) ||
    m.cohort.includes(search) || m.tags.some(t => t.includes(search))
  );

  return (
    <View style={{ flex: 1, backgroundColor: BG }}>
      <View style={s.header}>
        <View style={s.tabRow}>
          <TouchableOpacity style={[s.tabBtn, s.tabBtnActive]}>
            <Text style={[s.tabLabel, s.tabLabelActive]}>🔍</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.tabBtn}>
            <Text style={s.tabLabel}>🏷️</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          value={search} onChangeText={setSearch}
          placeholder="自由テキストを入れてください。"
          style={s.searchInput}
          placeholderTextColor="#BDBDBD"
        />
      </View>
      {loading ? (
        <ActivityIndicator style={s.loader} size="large" color={BLUE} />
      ) : (
        <ScrollView contentContainerStyle={s.listPad}>
          {filtered.length === 0 && <Text style={s.empty}>該当するメンバーが見つかりません</Text>}
          {filtered.map(member => (
            <TouchableOpacity key={member.id} onPress={() => navigation.navigate("MemberDetail", { member })} activeOpacity={0.75}>
              <Card style={s.memberCard}>
                <Avatar name={member.name} size={72} color={member.color} radius={12} />
                <View style={{ flex: 1 }}>
                  <Text style={s.memberName}>{member.name}</Text>
                  <Text style={s.memberSub}>{member.cohort}</Text>
                  {member.university ? <Text style={s.memberSub}>{member.university}</Text> : null}
                  {member.tags.length > 0 && (
                    <View style={s.tagRow}>{member.tags.map(tag => <Tag key={tag} label={tag} />)}</View>
                  )}
                </View>
                <Text style={s.chevron}>›</Text>
              </Card>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const s = StyleSheet.create({
  loader:      { flex: 1, marginTop: 80 },
  header:      { backgroundColor: "#fff", paddingHorizontal: 16, paddingBottom: 12 },
  tabRow:      { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#E0E0E0" },
  tabBtn:      { flex: 1, paddingVertical: 10, alignItems: "center", borderBottomWidth: 2, borderBottomColor: "transparent" },
  tabBtnActive:{ borderBottomColor: BLUE },
  tabLabel:    { fontSize: 14, fontWeight: "700", color: "#999" },
  tabLabelActive:{ color: BLUE },
  searchInput: { borderWidth: 1.5, borderColor: "#E0E0E0", borderRadius: 24, paddingHorizontal: 16, paddingVertical: 10, fontSize: 14, backgroundColor: "#F4F6F8", marginTop: 12 },
  listPad:     { padding: 16 },
  empty:       { textAlign: "center", color: "#999", marginTop: 32 },
  memberCard:  { padding: 12, flexDirection: "row", alignItems: "center", gap: 12 },
  memberName:  { fontSize: 18, fontWeight: "700", marginBottom: 2 },
  memberSub:   { fontSize: 13, color: "#777" },
  tagRow:      { flexDirection: "row", flexWrap: "wrap", marginTop: 4 },
  chevron:     { color: BLUE, fontSize: 22, marginLeft: 4 },
});
