// ─── APIクライアント ──────────────────────────────────────────────────────────
// バックエンドとの通信を一元管理するファイル。
//
// ● Expo Web (ブラウザ) → localhost:3001 を使用
// ● Expo Go (実機/シミュレータ) → 開発PCのLAN IPを自動取得して使用
// 将来クラウドにデプロイしたら:
//   const API_BASE = "https://your-api.com/api";

import { Member, Event, NewsItem, Profile } from "../data/types";
import Constants from "expo-constants";

// Expo Go実行時はhostUriからIPを取得、それ以外はlocalhost
const host = Constants.expoConfig?.hostUri?.split(":")[0] ?? "localhost";
const API_BASE = `http://${host}:3001/api`;

// ── 汎用fetch（エラーハンドリング共通化）
async function fetchApi<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) throw new Error(`API error: ${res.status} ${path}`);
  return res.json() as Promise<T>;
}

async function patchApi<T>(path: string, body?: object): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(`API error: ${res.status} ${path}`);
  return res.json() as Promise<T>;
}

export const api = {
  getMembers:       () => fetchApi<Member[]>("/members"),
  getEvents:        () => fetchApi<Event[]>("/events"),
  getNews:          () => fetchApi<NewsItem[]>("/news"),
  getProfile:       () => fetchApi<Profile>("/profile"),
  likeNews:         (id: number) => patchApi<NewsItem>(`/news/${id}/like`),
  registerEvent:    (id: number, registered: boolean) => patchApi<Event>(`/events/${id}/register`, { registered }),
};
