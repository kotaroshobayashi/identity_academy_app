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
import { BLUE } from "../theme";

// ── タブ定義（タブを増やしたい時はここに追加するだけ）
const TABS = [
  { id: "news",    label: "News",    icon: "📋", Screen: NewsScreen },
  { id: "event",   label: "Event",   icon: "📆", Screen: EventScreen },
  { id: "member",  label: "Member",  icon: "👥", Screen: MemberScreen },
  { id: "setting", label: "Setting", icon: "⚙️", Screen: SettingScreen },
] as const;
type TabId = typeof TABS[number]["id"];

// ── ボトムナビ付きメイン画面
const MainTabs = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState<TabId>("news");
  const ActiveScreen = TABS.find(t => t.id === activeTab)!.Screen;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar barStyle="dark-content" />
      <View style={{ flex: 1, overflow: "hidden" }}>
        <ActiveScreen navigation={navigation} />
      </View>
      <View style={s.bottomNav}>
        {TABS.map(tab => (
          <TouchableOpacity key={tab.id} onPress={() => setActiveTab(tab.id)} style={s.navItem}>
            <Text style={{ fontSize: 22 }}>{tab.icon}</Text>
            <Text style={[s.navLabel, activeTab === tab.id && s.navLabelActive]}>{tab.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

// ── スタックナビゲーター（画面遷移の設定）
const Stack = createNativeStackNavigator();

export const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#fff" },
        headerTintColor: BLUE,
        headerTitleStyle: { fontWeight: "700" },
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
  bottomNav:     { flexDirection: "row", backgroundColor: "#fff", borderTopWidth: 1, borderTopColor: "#E8E8E8", paddingBottom: 4 },
  navItem:       { flex: 1, alignItems: "center", paddingTop: 10, paddingBottom: 6 },
  navLabel:      { fontSize: 11, color: "#BDBDBD", marginTop: 2 },
  navLabelActive:{ color: BLUE, fontWeight: "700" },
});
