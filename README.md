# Identities App

Identity Academy コミュニティアプリ（React Native + Expo）

---

## プロジェクト構成

```
IdentitiesApp/
├── frontend/          # Expoアプリ（iOS / Android / Web）
│   └── src/
│       ├── api/       # バックエンドAPIとの通信
│       ├── components/# 再利用UIパーツ（Avatar, Card, Tag...）
│       ├── screens/   # 各画面（1ファイル = 1画面）
│       ├── navigation/# 画面遷移・タブ設定
│       ├── data/      # 型定義（TypeScript）
│       └── theme.ts   # 色・定数
├── backend/           # APIサーバー（Node.js + Express）
│   └── src/
│       ├── routes/    # APIエンドポイント
│       └── data/      # ★ データ管理（JSONファイル）← ここを編集でデータ更新
└── README.md
```

---

## セットアップ（初回）

```bash
# 1. リポジトリをクローン
git clone https://github.com/your-org/IdentitiesApp.git
cd IdentitiesApp

# 2. フロントエンドの依存をインストール
cd frontend && npm install && cd ..

# 3. バックエンドの依存をインストール
cd backend && npm install && cd ..
```

---

## 起動方法

**ターミナル1（バックエンド）:**
```bash
cd backend
npm run dev
# → http://localhost:3001 で起動
```

**ターミナル2（フロントエンド）:**
```bash
cd frontend
npx expo start
# → iOSシミュレータ: i キー
# → Androidエミュレータ: a キー
# → ブラウザ: w キー
```

---

## データを更新する方法

`backend/src/data/` フォルダのJSONファイルを編集するだけ：

| ファイル | 内容 |
|---|---|
| `members.json` | メンバー情報 |
| `events.json`  | イベント情報 |
| `news.json`    | ニュース・お知らせ |
| `profile.json` | マイプロフィール |

編集後はバックエンドが自動で再起動（`npm run dev` 実行中の場合）。

---

## チームでの開発フロー（GitHub）

```
main          ← 本番環境（直接コミット禁止）
  └── develop ← 開発統合ブランチ
        ├── feature/add-member-photo  ← 機能追加
        ├── fix/event-registration    ← バグ修正
        └── data/update-march-events  ← データ更新のみ
```

### 作業の流れ
```bash
# 1. developから新しいブランチを作る
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name

# 2. 作業・コミット
git add .
git commit -m "feat: メンバー写真表示を追加"

# 3. GitHubにプッシュ → Pull Requestを作成
git push origin feature/your-feature-name
```

### コミットメッセージのルール
| プレフィックス | 使う場面 |
|---|---|
| `feat:` | 新機能追加 |
| `fix:` | バグ修正 |
| `data:` | JSONデータの更新のみ |
| `style:` | デザイン変更（機能変更なし） |
| `refactor:` | コード整理（動作変更なし） |

---

## API一覧

バックエンドが起動中（http://localhost:3001）の場合：

```
GET /api/members       メンバー一覧
GET /api/members/:id   メンバー詳細
GET /api/events        イベント一覧
GET /api/events/:id    イベント詳細
GET /api/news          ニュース一覧
GET /api/news/:id      ニュース詳細
GET /api/profile       マイプロフィール
```
