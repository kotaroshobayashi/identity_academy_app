// ─── 型定義（フロントエンド・バックエンド共通）────────────────────────────────
// データ構造が変わったら必ずここを先に更新する。
// TypeScriptがコンパイルエラーで変更漏れを教えてくれる。

export interface Member {
  id:         number;
  name:       string;
  cohort:     string;
  university: string;
  tags:       string[];
  color:      string;
  bio:        string;
}

export interface Event {
  id:          number;
  date:        string;
  title:       string;
  time:        string;
  organizer:   string;
  registered:  boolean;
  accent:      string;
  description: string;
}

export interface NewsItem {
  id:        number;
  title:     string;
  time:      string;
  likes:     number;
  color:     string;
  body:      string;
  image_url?: string;
}

export interface Profile {
  name:   string;
  cohort: string;
  email:  string;
  color:  string;
  bio:    string;
}
