// Chat.tsx - チャットリスト画面
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ChatList.css";
import Header from "./components/Header";

interface User {
  username: string;
  email: string;
}

function ChatList() {
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();
  const currentUserEmail = "kishi@1021gmai.com"; // ログインしているユーザーのメールアドレス

  useEffect(() => {
    fetch("http://localhost:8080/api/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) =>
        console.error("There was a problem with the fetch operation:", error)
      );
  }, []);

  const handleDMClick = (userEmail: string) => {
    navigate(`/direct-message/${userEmail}`);
  };

  return (
    <div>
      <Header />
      <div className="chat-list-container">
        <h2>Direct Messages</h2>
        <div className="user-cards">
          {users
            .filter((user) => user.email !== currentUserEmail)
            .map((user) => (
              <div className="user-card" key={user.email}>
                <h3>{user.username}</h3>
                <p>{user.email}</p>
                <button
                  onClick={() => handleDMClick(user.email)}
                  className="dm-button"
                >
                  DM
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default ChatList;
