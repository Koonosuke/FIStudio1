import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";
import "./Profile.css";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

interface User {
  username: string;
  email: string;
  grade: number;
  pr: string;
}

function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/user`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("User data fetch failed");
        }
        return response.json();
      })
      .then((data) => {
        setUser({
          username: data.username,
          email: data.email,
          grade: data.grade,
          pr: data.pr,
        });
      })
      .catch((error) => {
        console.error("Error fetching user info:", error);
        navigate("/"); // エラー時にログインページにリダイレクト
      });
  }, [navigate]);

  return (
    <div>
      <Header />
      <div id="profile-screen">
        <div id="main-contents">
          <div className="profile-card">
            <h1>Profile</h1>
            <p>Username: {user?.username || "Not available"}</p>
            <p>Email: {user?.email || "Not available"}</p>
            <p>Grade: {user?.grade || "Not available"}</p>
            <p>PR: {user?.pr || "Not available"}</p>
          </div>
        </div>

        <div id="buttons">
          <div className="button" onClick={() => navigate("/profile")}>
            <p>Home</p>
          </div>
          <div className="button" onClick={() => navigate("/profile/edit")}>
            <p>Edit</p>
          </div>
          <div className="button" onClick={() => navigate("/profile/review")}>
            <p>Review</p>
          </div>
          <div className="button" onClick={() => navigate("/profile/admin")}>
            <p>Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
