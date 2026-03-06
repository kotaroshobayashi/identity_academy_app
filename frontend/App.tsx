// ─── エントリポイント ─────────────────────────────────────────────────────────
// このファイルはアプリの起動点のみ。ロジックは src/ フォルダ以下に分割されています。
//
// src/
//   data/        … メンバー・イベント・ニュースのデータ定義（将来API化するならここ）
//   components/  … Avatar・Tag・Card など再利用UIパーツ
//   screens/     … 各画面（1ファイル1画面）
//   navigation/  … 画面遷移の設定
//   theme.ts     … 色・定数

import React from "react";
import { AppNavigator } from "./src/navigation";

export default function App() {
  return <AppNavigator />;
}
