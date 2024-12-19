import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import "./UserReview.css";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

interface Content {
  id: number;
  subjectName: string; // 科目名を追加
  content: string;
  evaluation: number;
  pastExams: string;
  createdAt: string;
  userName: string;
}

const UserContentsPage: React.FC = () => {
  const [userContents, setUserContents] = useState<Content[]>([]); // ユーザーの投稿内容
  const [loading, setLoading] = useState(true); // ローディング状態
  const [error, setError] = useState<string | null>(null); // エラーメッセージ

  useEffect(() => {
    const fetchUserContents = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/subjects/contents/user`,
          {
            method: "GET",
            credentials: "include", // セッション情報を送信
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user contents");
        }

        const data = await response.json();
        setUserContents(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserContents();
  }, []);

  const renderStars = (rating: number) => (
    <div style={{ display: "flex", alignItems: "center" }}>
      {Array.from({ length: 5 }, (_, index) => (
        <FaStar
          key={index}
          color={index < rating ? "#FFD700" : "#ddd"} // 黄色(#FFD700)と灰色(#ddd)
          size={16}
          style={{ marginRight: "2px" }}
        />
      ))}
    </div>
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="user-contents-page">
      <h1>あなたの投稿したコメント一覧</h1>
      {userContents.length > 0 ? (
        <ul>
          {userContents.map((content) => (
            <li key={content.id} className="content-card">
              <h2>{content.subjectName || "科目名未設定"}</h2>
              <p>
                <strong>コメント:</strong> {content.content}
              </p>
              <p>
                <strong>評価:</strong> {renderStars(content.evaluation)}
              </p>
              <p>
                <strong>過去問情報:</strong> {content.pastExams || "なし"}
              </p>
              <p>
                <strong>投稿日:</strong>{" "}
                {new Date(content.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>まだコメントを投稿していません。</p>
      )}
    </div>
  );
};

export default UserContentsPage;
