import React, { useEffect, useState } from "react";
import "./SubjectList.css";
import Header from "./components/Header";
import SubjectCard from "./components/SubjectCard";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
interface Content {
  id: number;
  content: string;
  evaluation: number;
  pastExams: string;
  createdAt: string;
  userId: string; // ユーザーID
  userName: string; // ユーザー名を追加
}

interface Subject {
  id: number;
  subjectName: string;
  teacherName: string;
  year: number;
  contents: Content[];
}

const SubjectList: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [filteredSubjects, setFilteredSubjects] = useState<Subject[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [form, setForm] = useState({
    subjectName: "",
    teacherName: "",
    year: 2024,
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentUser, setCurrentUser] = useState<any>(null);

  // 現在のユーザー情報を取得
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/user`, {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) throw new Error("Failed to fetch current user");

        const userData = await response.json();
        setCurrentUser(userData);
      } catch (error) {
        console.error("Error fetching current user:", error);
        setCurrentUser(null);
      }
    };

    fetchCurrentUser();
  }, []);

  // サーバーから科目リストを取得
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/subjects`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) throw new Error("Failed to fetch subjects");

        const data = await response.json();
        setSubjects(data);
        setFilteredSubjects(data);
      } catch (error) {
        console.error("Error fetching subjects:", error);
        setErrorMessage("科目の取得に失敗しました。");
      }
    };

    fetchSubjects();
  }, []);

  // 検索機能
  useEffect(() => {
    const filterSubjects = () => {
      const query = searchQuery.toLowerCase();
      const filtered = subjects.filter(
        (subject) =>
          subject.subjectName.toLowerCase().includes(query) ||
          subject.teacherName.toLowerCase().includes(query) ||
          subject.year.toString().includes(query)
      );
      setFilteredSubjects(filtered);
    };

    filterSubjects();
  }, [searchQuery, subjects]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      if (!currentUser) throw new Error("ユーザー情報が取得できませんでした。");

      const subjectData = {
        ...form,
        userId: currentUser.email || "unknownUser",
      };

      const response = await fetch(`${API_BASE_URL}/api/subjects`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(subjectData),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || "Failed to add subject");
      }

      const newSubject = await response.json();
      setSubjects((prevSubjects) => [...prevSubjects, newSubject]);
      setForm({ subjectName: "", teacherName: "", year: 2024 });
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("予期しないエラーが発生しました。");
      }
      console.error("Error adding subject:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="container mx-auto p-4">
        <h2 className="subject-list-title">科目一覧</h2>
        {currentUser ? (
          <>
            <div className="search-bar">
              <input
                type="text"
                placeholder="科目名、教員名、年度を検索"
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="subject-list">
              {filteredSubjects.map((subject) => (
                <SubjectCard key={subject.id} {...subject} />
              ))}
            </div>
          </>
        ) : (
          <h3 className="text-center text-lg font-bold text-gray-700">
            ログインしてください
          </h3>
        )}
      </div>
    </div>
  );
};

export default SubjectList;
