// ─── APIクライアント ──────────────────────────────────────────────────────────
// バックエンドとの通信を一元管理するファイル。
// バックエンドのURLが変わった場合は API_BASE だけ変更すればOK。
//
// 将来クラウドにデプロイしたら:
//   const API_BASE = "https://your-api.com/api";

import { Member, Event, NewsItem, Profile } from "../data/types";

const API_BASE = "http://localhost:3001/api";

// ── 汎用fetch（エラーハンドリング共通化）
async function fetchApi<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) throw new Error(`API error: ${res.status} ${path}`);
  return res.json() as Promise<T>;
}

export const api = {
  getMembers: () => fetchApi<Member[]>("/members"),
  getEvents:  () => fetchApi<Event[]>("/events"),
  getNews:    () => fetchApi<NewsItem[]>("/news"),
  getProfile: () => fetchApi<Profile>("/profile"),
};
