## SpringBoot と React の連帯（ログイン機能）

## JWT 認証の追加をここで

### CSRF（クロスサイトリクエストフォージェリ）保護を無効化

なぜ？
→CSRF の背景と仕組み
CSRF（Cross-Site Request Forgery）は、悪意のあるウェブサイトがユーザーのブラウザを使って意図せずリクエストを送信し、認証済みユーザーが他のウェブサイトで行うべきでない操作を行わせる攻撃です。これは、ブラウザが自動的に認証クッキーを付加する特性を悪用します。
これを有効にしていると API 通信ができない

→ 無効にして以下のやり方で通信のセキュリティ対策をする
API におけるセキュリティ対策
CSRF 保護を無効化しても、以下のようなセキュリティ対策を行うことで、API を安全に運用できます。

### トークン認証

JWT のようなトークンベースの認証方式を使うことで、リクエストごとに認証情報を明示的に送信します。
CORS 設定

API が特定のクライアントからのリクエストのみを許可するように CORS（Cross-Origin Resource Sharing）を設定することで、他のオリジンからのリクエストを制限します。
HTTPS の使用

トークンや認証情報がネットワークを通じて送信される際に盗聴されるリスクを減らすために、HTTPS を使用します。

### CORS とは？

CORS は、ブラウザが異なるオリジン（例えば、異なるドメインやポート、プロトコル）からのリクエストを制御する仕組みです。通常、ブラウザはセキュリティ上の理由から、あるオリジン（例：http://localhost:3000）から別のオリジン（例：http://localhost:8080）にアクセスしようとすると、アクセスを制限します。これを 同一オリジンポリシー と言います。

C:\Users\81809\ドキュメント - コピー\FIStudio1\samplelogin>mvn clean package
C:\Users\81809\ドキュメント - コピー\FIStudio1\samplelogin>mvn clean package
C:\Users\81809\ドキュメント - コピー\FIStudio1>docker-compose down --volumes
C:\Users\81809\ドキュメント - コピー\FIStudio1>docker-compose up --build

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
${API_BASE_URL}

# 現在の状況

## フロントエンドとバックエンドの構成

バックエンド (Spring Boot):
Docker コンテナ内で動作。
docker-compose で backendspring というサービス名が設定されている。
ホストマシンでは http://localhost:8080 経由でアクセス可能。
フロントエンド (React):
現在、Docker コンテナ内で動作。
ブラウザ（ホストマシンの http://localhost:3000）でアクセスしている。
使用中の環境変数

REACT_APP_API_BASE_URL=http://backendspring:8080 に設定。
React のコード内で API のベース URL としてこの値が使用されている。
現在の問題

React アプリがブラウザで動作する際、http://backendspring:8080 に対する API リクエストが失敗 (net::ERR_NAME_NOT_RESOLVED)。
理由: ブラウザは backendspring という Docker ネットワーク内の名前を解決できない。

# これから行う事

## React を Nginx を使って完全に Docker コンテナ内で動作させたい

### 1. Nginx 設定ファイルの追加

### 2. Dockerfile の変更

### 3. Docker Compose の変更
