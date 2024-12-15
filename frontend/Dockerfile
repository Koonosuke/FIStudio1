# 1. Node.jsを使ってアプリケーションをビルド
FROM node:20-alpine AS build

# 作業ディレクトリを設定
WORKDIR /app

# package.json と lock ファイルをコピー
COPY package.json package-lock.json ./

# 依存関係をインストール
RUN npm install

# アプリケーションコードをコピー
COPY . .

# アプリケーションをビルド
RUN npm run build

# Nginxを起動
CMD ["npm","start"]