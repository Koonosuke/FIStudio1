// src/components/Header.js
import { useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await fetch("http://localhost:8080/api/logout", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      navigate("/login"); // ログアウト後にログイン画面に遷移
    } else {
      alert("ログアウトに失敗しました");
    }
  };
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
          <li>
            <button onClick={handleLogout} className="logout-button">
              ログアウト
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
