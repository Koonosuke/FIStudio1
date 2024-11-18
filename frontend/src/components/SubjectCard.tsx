import React, { useState } from "react";

interface Content {
  id: number;
  content: string;
  evaluation: number;
  pastExams: string;
  createdAt: string;
  userId: string;
}

interface Subject {
  id: number;
  subjectName: string;
  teacherName: string;
  year: number;
  contents?: Content[]; // Optional propertyにすることでundefinedを許容
}

const SubjectCard: React.FC<Subject> = ({
  id,
  subjectName,
  teacherName,
  year,
  contents = [], // 初期値を空の配列にすることでundefinedを防ぐ
}) => {
  const [showForm, setShowForm] = useState(false);
  const [newContent, setNewContent] = useState("");
  const [newEvaluation, setNewEvaluation] = useState(0);
  const [newPastExams, setNewPastExams] = useState("");
  const [userId, setUserId] = useState(""); // ユーザーIDを管理するための状態追加

  const handleAddContent = async () => {
    try {
      const contentData = {
        content: newContent,
        evaluation: newEvaluation,
        pastExams: newPastExams,
        userId: userId, // ユーザーIDを追加
      };

      const response = await fetch(
        `http://localhost:8080/api/subjects/${id}/contents`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // ヘッダーに適切な Content-Type を設定
            Accept: "application/json", // 必要であれば、Acceptヘッダーも追加
          },
          body: JSON.stringify(contentData),
        }
      );

      if (response.ok) {
        console.log("Content added successfully");
      } else {
        console.error("Error adding content:", response.statusText);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <div className="subject-card">
      <h3>{subjectName}</h3>
      <p>担当教員: {teacherName}</p>
      <p>受講年度: {year}</p>
      <button onClick={() => setShowForm(!showForm)}>+</button>
      {showForm && (
        <div className="add-content-form">
          <input
            type="text"
            placeholder="ユーザーID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <textarea
            placeholder="授業内容"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          ></textarea>
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
          ></textarea>
          <button onClick={handleAddContent}>追加</button>
        </div>
      )}
      <div className="contents-list">
        <h4>投稿内容:</h4>
        {contents.length > 0 ? (
          contents.map((content) => (
            <div key={content.id} className="content-item">
              <p>{content.content}</p>
              <p>評価: {content.evaluation} / 5</p>
              <p>過去問: {content.pastExams}</p>
              <p>投稿者: {content.userId}</p>
              <p>投稿日: {new Date(content.createdAt).toLocaleString()}</p>
            </div>
          ))
        ) : (
          <p>まだ投稿がありません。</p>
        )}
      </div>
    </div>
  );
};

export default SubjectCard;
