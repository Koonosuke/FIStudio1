import React, { useEffect, useState } from "react";
import "./ChatList.css";
import Header from "./components/Header";

interface User {
  email: string;
  username: string;
}

const ChatList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const currentUser = "current_user_email@example.com";

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
    console.log("Start DM with:", userEmail);
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
};

export default ChatList;
