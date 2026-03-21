// ─── ナビゲーション設定 ───────────────────────────────────────────────────────
// 画面の追加・削除はここだけ修正すればOK

import React, { useState } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { NewsScreen }         from "../screens/NewsScreen";
import { EventScreen }        from "../screens/EventScreen";
import { MemberScreen }       from "../screens/MemberScreen";
import { SettingScreen }      from "../screens/SettingScreen";
import { MemberDetailScreen } from "../screens/MemberDetailScreen";
import { EventDetailScreen }  from "../screens/EventDetailScreen";
import { NewsDetailScreen }   from "../screens/NewsDetailScreen";
import { COLORS } from "../theme";

// ── タブ定義
const TABS = [
  { id: "news",    label: "タイムライン", icon: "📰", Screen: NewsScreen },
  { id: "event",   label: "イベント",     icon: "🗓",  Screen: EventScreen },
  { id: "member",  label: "メンバー",     icon: "👥", Screen: MemberScreen },
  { id: "setting", label: "マイページ",   icon: "👤", Screen: SettingScreen },
] as const;
type TabId = typeof TABS[number]["id"];

// ── ボトムナビ付きメイン画面
const MainTabs = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState<TabId>("news");
  const ActiveScreen = TABS.find(t => t.id === activeTab)!.Screen;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar barStyle="dark-content" />
      {/* ブランドヘッダー */}
      <View style={s.brandHeader}>
        <View style={s.brandLogoMark} />
        <Text style={s.brandName}>
          Identity<Text style={s.brandAccent}> Academy</Text>
        </Text>
      </View>
      <View style={{ flex: 1, overflow: "hidden" }}>
        <ActiveScreen navigation={navigation} />
      </View>
      {/* ボトムナビ */}
      <View style={s.bottomNav}>
        {TABS.map(tab => {
          const active = activeTab === tab.id;
          return (
            <TouchableOpacity key={tab.id} onPress={() => setActiveTab(tab.id)} style={s.navItem}>
              <Text style={[s.navIcon, active && s.navIconActive]}>{tab.icon}</Text>
              <Text style={[s.navLabel, active && s.navLabelActive]}>{tab.label}</Text>
              {active && <View style={s.navDot} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

// ── スタックナビゲーター
const Stack = createNativeStackNavigator();

export const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#fff" },
        headerTintColor: COLORS.primary,
        headerTitleStyle: { fontWeight: "700", color: COLORS.text },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="Main"         component={MainTabs}          options={{ headerShown: false }} />
      <Stack.Screen name="MemberDetail" component={MemberDetailScreen} options={{ title: "メンバー詳細" }} />
      <Stack.Screen name="EventDetail"  component={EventDetailScreen}  options={{ title: "イベント詳細" }} />
      <Stack.Screen name="NewsDetail"   component={NewsDetailScreen}   options={{ title: "ニュース詳細" }} />
    </Stack.Navigator>
  </NavigationContainer>
);

const s = StyleSheet.create({
  // ブランドヘッダー
  brandHeader:   { flexDirection: "row", alignItems: "center", paddingHorizontal: 18, paddingVertical: 12, backgroundColor: "#fff", borderBottomWidth: 1, borderBottomColor: "#F0F0F5" },
  brandLogoMark: { width: 8, height: 24, backgroundColor: COLORS.primary, borderRadius: 4, marginRight: 8 },
  brandName:     { fontSize: 18, fontWeight: "900", color: COLORS.text, letterSpacing: 0.3 },
  brandAccent:   { fontSize: 18, fontWeight: "400", color: COLORS.primary },

  // ボトムナビ
  bottomNav:      { flexDirection: "row", backgroundColor: "#fff", borderTopWidth: 1, borderTopColor: "#F0F0F5", paddingBottom: 4 },
  navItem:        { flex: 1, alignItems: "center", paddingTop: 8, paddingBottom: 4 },
  navIcon:        { fontSize: 20, opacity: 0.4 },
  navIconActive:  { opacity: 1 },
  navLabel:       { fontSize: 10, color: COLORS.gray, marginTop: 2 },
  navLabelActive: { color: COLORS.primary, fontWeight: "700" },
  navDot:         { width: 4, height: 4, borderRadius: 2, backgroundColor: COLORS.primary, marginTop: 3 },
});
