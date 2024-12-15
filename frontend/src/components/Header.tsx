import { useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import "./Header.css";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
type LogoutModalProps = {
  onConfirm: () => void;
  onCancel: () => void;
};

// モーダルコンポーネント
function LogoutModal({ onConfirm, onCancel }: LogoutModalProps) {
  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal">
        <h2>ログアウト確認</h2>
        <p>ログアウトしますか？</p>
        <div className="modal-actions">
          <button onClick={onConfirm} className="confirm-button">
            はい
          </button>
          <button onClick={onCancel} className="cancel-button">
            いいえ
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

function Header() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        navigate("/"); // ログアウト後にログイン画面へ遷移
      } else {
        const errorText = await response.text();
        alert(`ログアウト失敗: ${errorText}`);
      }
    } catch (error) {
      console.error("ログアウト中にエラーが発生しました:", error);
      alert("ログアウト中にエラーが発生しました");
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const confirmLogout = () => {
    closeModal();
    handleLogout();
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
            <button onClick={openModal} className="logout-button">
              ログアウト
            </button>
          </li>
        </ul>
      </nav>
      {isModalOpen && (
        <LogoutModal onConfirm={confirmLogout} onCancel={closeModal} />
      )}
    </header>
  );
}

export default Header;
