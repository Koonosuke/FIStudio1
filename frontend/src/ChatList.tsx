import { useEffect, useState } from "react";
import "./ChatList.css"; // スタイリング用のCSSを追加
import Header from "./components/Header";

// User型を定義
interface User {
  username: string;
  email: string;
}

function ChatList() {
  // usersの型をUser[]に指定
  const [users, setUsers] = useState<User[]>([]);
  const currentUser = "current_user_email@example.com"; // Example current user email

  useEffect(() => {
    fetch("http://localhost:8080/api/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setUsers(data))
      .catch((error) =>
        console.error("There was a problem with the fetch operation:", error)
      );
  }, []);

  const handleDMClick = (userEmail: string) => {
    // DMボタンがクリックされたときの処理
    console.log("Start DM with:", userEmail);
    // 必要に応じて、チャットページに遷移するなどの処理を実装
  };

  return (
    <div>
      <Header />
      <div className="chat-list-container">
        <h2>Direct Messages</h2>
        <div className="user-cards">
          {users
            .filter((user) => user.email !== currentUser)
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
