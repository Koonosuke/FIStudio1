import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ChatList.css";
import Header from "./components/Header";

interface User {
  username: string;
  email: string;
}

interface LatestMessage {
  receiverEmail: string;
  content: string;
}

function ChatList() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null); // ログインユーザー情報
  const [latestMessages, setLatestMessages] = useState<{
    [key: string]: string;
  }>({}); // 最新メッセージのマップ
  const navigate = useNavigate();

  // ログイン中のユーザーを取得
  useEffect(() => {
    fetch("http://localhost:8080/api/user", {
      method: "GET",
      credentials: "include", // セッションを含める
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Failed to fetch current user");
      })
      .then((data) => setCurrentUser(data))
      .catch((error) => console.error("Error fetching current user:", error));
  }, []);

  // ユーザー一覧を取得
  useEffect(() => {
    fetch("http://localhost:8080/api/users", {
      method: "GET",
      credentials: "include", // セッションを含める
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

  // 各ユーザーの最新メッセージを取得
  useEffect(() => {
    if (currentUser) {
      users.forEach((user) => {
        if (user.email !== currentUser.email) {
          fetch(
            `http://localhost:8080/api/messages/latest?userEmail1=${currentUser.email}&userEmail2=${user.email}`,
            {
              method: "GET",
              credentials: "include", // セッションを含める
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
            .then((response) => response.json())
            .then((data: LatestMessage) => {
              setLatestMessages((prev) => ({
                ...prev,
                [user.email]: data.content,
              }));
            })
            .catch((error) =>
              console.error("Error fetching latest message:", error)
            );
        }
      });
    }
  }, [currentUser, users]);

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
            .filter((user) => user.email !== currentUser?.email) // ログイン中のユーザーを除外
            .map((user) => (
              <div className="user-card" key={user.email}>
                <h3>{user.username}</h3>
                <p>{user.email}</p>
                <p className="latest-message">
                  {latestMessages[user.email] || "メッセージはありません"}
                </p>
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
