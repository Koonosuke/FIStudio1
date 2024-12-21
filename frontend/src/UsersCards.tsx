import React, { useEffect, useState } from "react";
import "./UserCards.css";
import Header from "./components/Header";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

interface User {
  id: number;
  username: string;
  email: string;
  grade: number;
  pr: string;
}

interface Content {
  id: number;
  subjectName: string;
  content: string;
  evaluation: number;
  pastExams: string;
  createdAt: string;
}

const UserCards: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]); // 絞り込み後のユーザ
  const [searchQuery, setSearchQuery] = useState<string>(""); // 検索クエリ
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/users`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) throw new Error("Failed to fetch users");

        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data); // 初期表示では全ユーザを表示
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const toggleCardFlip = (userId: number) => {
    setFlippedCards((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  // 検索処理
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = users.filter(
      (user) =>
        user.username.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.grade.toString().includes(query) ||
        user.pr.toLowerCase().includes(query)
    );

    setFilteredUsers(filtered);
  };

  return (
    <div className="head">
      <Header />
      <div className="search-bar">
        <input
          type="text"
          placeholder="ユーザ名、Email、Grade、PRで検索"
          value={searchQuery}
          onChange={handleSearch}
          className="search-input"
        />
      </div>
      <div className="user-profile-container">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className={`user-profile-card ${
              flippedCards[user.id] ? "flipped" : ""
            }`}
          >
            <div className="card-front">
              <h3>{user.username}</h3>
              <p>Email: {user.email}</p>
              <p>Grade: {user.grade}</p>
              <p>PR: {user.pr}</p>
              <button onClick={() => toggleCardFlip(user.id)}>
                ここをタップ
              </button>
            </div>
            <div className="card-back">
              <h3>{user.username} の投稿</h3>
              <p>ここでAPI読みだして科目の投稿取得</p>
              <button onClick={() => toggleCardFlip(user.id)}>戻る</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserCards;
