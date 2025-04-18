import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";
import "./Profile.css";
import "./ProfileEdit.css";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function ProfileEdit() {
  const [username, setUsername] = useState("");
  const [grade, setGrade] = useState("");
  const [pr, setPr] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleEdit = async () => {
    setIsLoading(true); // ローディング状態開始

    const body = new URLSearchParams();
    body.append("username", username);
    body.append("grade", grade);
    body.append("pr", pr);

    try {
      const response = await fetch(`${API_BASE_URL}/api/edit`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
      });

      if (response.ok) {
        navigate("/profile"); // プロフィール画面に戻る
      } else {
        const errorData = await response.json().catch(() => null);
        alert(errorData?.message || "Profile update failed.");
      }
    } catch (error) {
      alert("Network error occurred. Please try again.");
    } finally {
      setIsLoading(false); // ローディング状態終了
    }
  };

  return (
    <div>
      <Header />
      <div id="profile-screen">
        <div id="main-contents">
          <h1>Profile</h1>
          <h2>
            Username <br />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </h2>

          <h2>
            Grade <br />
            <input
              type="number"
              placeholder="Grade"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
            />
          </h2>
          <h2>
            PR <br />
            <textarea
              value={pr}
              placeholder="Your PR"
              onChange={(e) => setPr(e.target.value)}
              cols={50}
              rows={10}
            ></textarea>
          </h2>

          <button onClick={handleEdit} disabled={isLoading}>
            {isLoading ? "Updating..." : "Edit"}
          </button>
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

export default ProfileEdit;
