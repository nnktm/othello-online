# Othello Online

ブラウザ上で2人が対戦できるオンラインオセロアプリです。ゲームの作成・参加、観戦、対戦履歴の閲覧ができます。

**デプロイ先:** https://othello-online-two.vercel.app/

**リポジトリ:** https://github.com/nnktm/othello-online

---

## 概要

本アプリは、ログイン不要でURLを共有するだけで対戦を始められるオンラインオセロです。
黒（先手）プレイヤーがゲームを作成し、白（後手）プレイヤーが一覧から参加する流れで対戦します。盤面の状態はサーバー側のデータベースに保存され、クライアントはポーリングで同期します。

### 主な機能

| 機能           | 説明                                                                          |
| -------------- | ----------------------------------------------------------------------------- |
| ゲーム作成     | プレイヤー名を入力して新規ゲームを作成。作成者は黒（先手）として参加          |
| 対戦相手募集   | 白プレイヤー未参加のゲーム一覧から対戦相手を探して参加                        |
| オンライン対戦 | 8×8のオセロ盤で石を置き、相手の石を挟んで反転。手番・スキップ・終局判定に対応 |
| 観戦           | 観戦を許可した進行中のゲームを、操作なしで閲覧                                |
| 対戦履歴       | 結果保存を有効にしたゲームの終了後スコア・勝者を一覧表示                      |
| ゲーム中断     | 相手待ち中にゲームを削除してメニューへ戻れる                                  |

---

## 技術スタック

| カテゴリ       | 技術                                                    |
| -------------- | ------------------------------------------------------- |
| フロントエンド | Next.js 16 (App Router), React 18, TypeScript           |
| スタイリング   | CSS Modules                                             |
| バックエンド   | Next.js Route Handlers (API Routes)                     |
| ORM / DB       | Prisma, PostgreSQL                                      |
| インフラ       | Vercel（ホスティング）, Neon 等の PostgreSQL（本番 DB） |
| CI             | GitHub Actions（lint / typecheck / build）              |
| 開発環境       | Docker Compose（ローカル PostgreSQL）                   |

---

## アーキテクチャ

```mermaid
flowchart LR
  subgraph Client["ブラウザ (React)"]
    A[ゲーム画面]
    B[一覧・履歴画面]
  end

  subgraph Server["Next.js (Vercel)"]
    C[Route Handlers<br>/api/*]
    D[Prisma Client]
  end

  E[(PostgreSQL)]

  A -->|PUT/GET ポーリング| C
  B -->|GET| C
  C --> D
  D --> E
```

- **同期方式:** WebSocket ではなく、500ms 間隔の HTTP ポーリングで盤面を同期
- **ゲームロジック:** 合法手判定・反転・スキップ・終局判定をクライアント側で実装し、結果を API 経由で DB に保存
- **データモデル:** `Board` テーブルに盤面（JSON）、手番、プレイヤー名、終了フラグ、結果などを保持

---

## ディレクトリ構成

```
othello-online/
├── prisma/
│   ├── schema.prisma      # DB スキーマ定義
│   └── migrations/        # マイグレーション
├── src/
│   ├── app/
│   │   ├── page.tsx                    # トップ（メニュー）
│   │   ├── gameCreate/                 # ゲーム作成
│   │   ├── gameRecruitment/            # 対戦相手募集中一覧
│   │   ├── watch/                      # 観戦可能ゲーム一覧
│   │   ├── history/                    # 過去の対戦結果
│   │   ├── [id]/
│   │   │   ├── black/                  # 黒プレイヤー画面
│   │   │   ├── white/                  # 白プレイヤー画面
│   │   │   ├── watch/                  # 観戦画面
│   │   │   └── gameStart/              # 白プレイヤー参加
│   │   └── api/
│   │       ├── simple/                 # ゲーム作成
│   │       ├── separate/               # 盤面の取得・更新・削除
│   │       ├── gameStart/              # 白プレイヤー参加
│   │       ├── end/                    # 終局時の結果保存
│   │       └── history/                # ゲーム一覧取得
│   ├── components/        # モーダル等の UI コンポーネント
│   ├── constants/         # 初期盤面・方向ベクトル等
│   ├── lib/prisma.ts      # Prisma クライアント
│   └── styles/            # CSS Modules
├── .github/workflows/     # CI/CD
└── docker-compose.yml     # ローカル PostgreSQL
```

---

## セットアップ

### 前提条件

- Node.js 22 以上
- npm
- Docker（ローカル DB 用）

### 1. リポジトリのクローン

```bash
git clone https://github.com/nnktm/othello-online.git
cd othello-online
```

### 2. 依存関係のインストール

```bash
npm install
```

### 3. データベースの起動

```bash
docker compose up -d
```

### 4. 環境変数の設定

プロジェクトルートに `.env` を作成します。

```env
DATABASE_URL="postgresql://root:root@localhost:5432/db?schema=public"
```

### 5. マイグレーションの実行

```bash
npm run migrate
```

### 6. 開発サーバーの起動

```bash
npm run dev
```

http://localhost:3000 でアプリにアクセスできます。

---

## 使い方

1. **ゲームを作成する**
   トップ →「新しくゲームを作成してプレイする」→ プレイヤー名を入力 → 開始
   作成者は黒として対戦画面へ遷移します。

2. **対戦相手として参加する**
   別のブラウザ（またはシークレットウィンドウ）で
   トップ →「現在相手募集中のゲームを探す」→ ゲームを選択 → 白プレイヤー名を入力 → 参加

3. **観戦する**
   ゲーム作成時に「観戦を可能にする」をオンにした場合、
   トップ →「観戦可能なゲームを探す」から進行中の対局を閲覧できます。

4. **対戦結果を確認する**
   ゲーム作成時に「結果を保存する」をオンにした対局は、
   トップ →「過去の対戦結果を見る」から終了後のスコアを確認できます。

---

## 利用可能なスクリプト

| コマンド            | 説明                                                     |
| ------------------- | -------------------------------------------------------- |
| `npm run dev`       | 開発サーバー起動（Next.js + CSS Modules 型生成の watch） |
| `npm run build`     | 本番ビルド                                               |
| `npm run start`     | 本番サーバー起動                                         |
| `npm run migrate`   | Prisma マイグレーション（開発）                          |
| `npm run lint`      | ESLint / Prettier / Stylelint                            |
| `npm run typecheck` | 型チェック（happy-css-modules + tsc）                    |

---

## CI/CD

`push` および `pull_request` 時に GitHub Actions で以下を実行します。

- `npm run lint`
- `npm run typecheck`
- `npm run build`

本番環境は Vercel にデプロイされ、API のタイムアウトは `vercel.json` で 30 秒に設定しています。

---

## 今後の改善案

- WebSocket によるリアルタイム同期（ポーリングの削減）
- ユーザー認証と対戦履歴の個人紐づけ
- リプレイ機能
- スマートフォン向け UI の最適化
- E2E テストの追加

---

## 作者

<!-- 氏名・連絡先など、就活提出用に追記してください -->

- GitHub: [nnktm](https://github.com/nnktm)

---

## ライセンス

このプロジェクトは就活・ポートフォリオ用途で制作しています。利用・改変についてはリポジトリオーナーにお問い合わせください。
