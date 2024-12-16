import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
interface Content {
  userName: string;
  id: number;
  content: string;
  evaluation: number;
  pastExams: string;
  createdAt: string;
  userId: string; // ユーザーID
}

interface Subject {
  id: number;
  subjectName: string;
  teacherName: string;
  year: number;
}

const SubjectCard: React.FC<Subject> = ({
  id,
  subjectName,
  teacherName,
  year,
}) => {
  const [currentContents, setCurrentContents] = useState<Content[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newContent, setNewContent] = useState("");
  const [newEvaluation, setNewEvaluation] = useState(0);
  const [newPastExams, setNewPastExams] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [expanded, setExpanded] = useState(false); // 展開状態を管理

  // 投稿を取得する処理]
  useEffect(() => {
    const fetchContents = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/subjects/${id}/contents`,
          {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!response.ok) {
          throw new Error("投稿の取得に失敗しました");
        }

        const data = await response.json();
        setCurrentContents(data);
      } catch (error) {
        console.error("Error fetching contents:", error);
      }
    };

    fetchContents();
  }, [id]);

  const handleAddContent = async () => {
    try {
      const contentData = {
        content: newContent,
        evaluation: newEvaluation,
        pastExams: newPastExams,
      };

      const response = await fetch(
        `${API_BASE_URL}/api/subjects/${id}/contents`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(contentData),
        }
      );

      if (response.ok) {
        const updatedContent = await response.json();
        setCurrentContents((prev) => [...prev, updatedContent]);
        setNewContent("");
        setNewEvaluation(0);
        setNewPastExams("");
      } else {
        throw new Error("コメントの投稿に失敗しました");
      }
    } catch (error) {
      setErrorMessage("コメントの投稿に失敗しました。もう一度お試しください。");
      console.error("Error adding content:", error);
    }
  };

  const renderStars = (rating: number) => {
    return (
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
  };

  return (
    <div className="subject-card">
      <h3>{subjectName}</h3>
      <p>担当教員: {teacherName}</p>
      <p>受講年度: {year}</p>
      <button onClick={() => setShowForm(!showForm)}>コメントを追加</button>
      {showForm && (
        <div className="add-content-form">
          <textarea
            placeholder="授業内容"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          />
          <input
            type="number"
            placeholder="評価 (0-5)"
            value={newEvaluation}
            onChange={(e) => setNewEvaluation(Number(e.target.value))}
          />
          <textarea
            placeholder="過去問情報"
            value={newPastExams}
            onChange={(e) => setNewPastExams(e.target.value)}
          />
          <button onClick={handleAddContent}>投稿</button>
        </div>
      )}
      <div className={`contents-list ${expanded ? "expanded" : "collapsed"}`}>
        <h4>投稿内容:</h4>
        {currentContents.length > 0 ? (
          currentContents
            .slice(0, expanded ? currentContents.length : 1)
            .map((content) => (
              <div key={content.id} className="content-item">
                <p>投稿者: {content.userName}</p>
                <p>{content.content}</p>
                <p>評価: {renderStars(content.evaluation)}</p>
                <p>過去問: {content.pastExams || "なし"}</p>
                <p>投稿日: {new Date(content.createdAt).toLocaleString()}</p>
              </div>
            ))
        ) : (
          <p>まだ投稿がありません。</p>
        )}
      </div>
      {currentContents.length > 0 && (
        <button
          className="toggle-button"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "閉じる" : "もっと見る"}
        </button>
      )}
    </div>
  );
};

export default SubjectCard;
