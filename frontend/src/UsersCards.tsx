import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  content: string;
  evaluation: number; // 評価は1〜5
  pastExams: string;
  createdAt: string;
}

const UserCards: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [contents, setContents] = useState<Record<number, Content[]>>({});
  const [visibleContentCount, setVisibleContentCount] = useState<
    Record<number, number>
  >({});
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/users`, {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) throw new Error("Failed to fetch users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const fetchUserContents = async (userId: number) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/subjects/contents/user/${userId}`,
        {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch user contents");
      const data = await response.json();
      setContents((prev) => ({ ...prev, [userId]: data }));
      setVisibleContentCount((prev) => ({ ...prev, [userId]: 1 }));
    } catch (error) {
      console.error("Error fetching user contents:", error);
    }
  };

  const toggleCardFlip = (userId: number) => {
    setFlippedCards((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
    if (!contents[userId]) fetchUserContents(userId);
  };

  const loadMoreContents = (userId: number) => {
    setVisibleContentCount((prev) => ({
      ...prev,
      [userId]: prev[userId] + 1,
    }));
  };

  const closeContents = (userId: number) => {
    setVisibleContentCount((prev) => ({ ...prev, [userId]: 1 })); // 投稿を1件だけ表示に戻す
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleDMClick = (userEmail: string) => {
    navigate(`/direct-message/${userEmail}`); // DM画面に遷移
  };

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchQuery) ||
      user.email.toLowerCase().includes(searchQuery) ||
      user.grade.toString().includes(searchQuery) ||
      user.pr.toLowerCase().includes(searchQuery)
  );

  const renderStars = (count: number) => {
    return Array.from({ length: count }, (_, index) => (
      <span key={index} className="star">
        ★
      </span>
    ));
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
              <div className="button-container">
                <button
                  className="dm-button"
                  onClick={() => handleDMClick(user.email)}
                >
                  DM
                </button>
                <button
                  className="tap-button"
                  onClick={() => toggleCardFlip(user.id)}
                >
                  詳細を見る
                </button>
              </div>
            </div>
            <div className="card-back">
              <button
                className="back-button"
                onClick={() => toggleCardFlip(user.id)}
              >
                戻る
              </button>
              <h3>{user.username} の投稿</h3>
              {contents[user.id]
                ?.slice(0, visibleContentCount[user.id] || 0)
                .map((content) => (
                  <div key={content.id} className="content-item">
                    <p>内容: {content.content}</p>
                    <p>評価: {renderStars(content.evaluation)}</p>
                    <p>試験情報: {content.pastExams}</p>
                    <p>投稿日: {content.createdAt}</p>
                  </div>
                ))}
              <div className="button-container">
                {contents[user.id] &&
                  visibleContentCount[user.id]! < contents[user.id].length && (
                    <button
                      className="load-more-button"
                      onClick={() => loadMoreContents(user.id)}
                    >
                      もっと見る
                    </button>
                  )}
                {contents[user.id] && visibleContentCount[user.id]! > 1 && (
                  <button
                    className="close-button"
                    onClick={() => closeContents(user.id)}
                  >
                    閉じる
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserCards;
