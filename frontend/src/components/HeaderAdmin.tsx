// src/components/Header.js
import "./Header.css";

function HeaderAdmin() {
  return (
    <header className="header">
      <div className="logo">FI STUDIO 管理者</div>
      <nav className="nav">
        <ul>
          <li>
            <a href="/notificationAdmin">お知らせ</a>
          </li>
          <li>
            <a href="/subjectsAdmin">科目</a>
          </li>
          <li>
            <a href="/user-listAdmin">ユーザー一覧</a>
          </li>
          <li>
            <a href="/chatAdmin">チャット</a>
          </li>
          <li>
            <a href="/profileAdmin">プロフィール</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default HeaderAdmin;
