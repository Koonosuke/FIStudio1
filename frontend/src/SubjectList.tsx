import React, { useEffect, useState } from "react";
import "./SubjectList.css";
import Header from "./components/Header";
import SubjectCard from "./components/SubjectCard";
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
  contents: Content[];
}

const SubjectList: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/subjects")
      .then((response) => response.json())
      .then((data) => setSubjects(data))
      .catch((error) => console.error("Error fetching subjects:", error));
  }, []);

  return (
    <div>
      <Header />
      <div className="subject-list">
        <h2>科目一覧</h2>
        {subjects.map((subject) => (
          <SubjectCard key={subject.id} {...subject} />
        ))}
      </div>
    </div>
  );
};

export default SubjectList;
