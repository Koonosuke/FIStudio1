# ベースイメージとしてAmazon Correttoを使用（Java 17対応）
FROM amazoncorretto:17-alpine-jdk

# 作業ディレクトリを設定
WORKDIR /app

# Mavenビルドの成果物（JARファイル）をコンテナにコピー
COPY target/samplelogin-0.0.1-SNAPSHOT.jar app.jar

# 必要なポートを公開
EXPOSE 8080

# アプリケーションを実行
ENTRYPOINT ["java", "-jar", "/app/app.jar"]