import React from "react";
import "./Header.css";

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="logo">FI STUDIO</div>
      <nav className="nav">
        <ul>
          <li>
            <a href="/notification">お知らせ</a>
          </li>
          <li>
            <a href="/subjects">科目</a>
          </li>
          <li>
            <a href="/user-list">ユーザー一覧</a>
          </li>
          <li>
            <a href="/chat">チャット</a>
          </li>
          <li>
            <a href="/profile">プロフィール</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
