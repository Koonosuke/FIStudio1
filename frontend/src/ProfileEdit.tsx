import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";
import "./Profile.css";
import "./ProfileEdit.css";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function ProfileEdit() {
  //const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [grade, setGrade] = useState("");
  const [pr, setPr] = useState("");

  const navigate = useNavigate();

  const body = new URLSearchParams();
  body.append("username", username);
  body.append("grade", grade);
  body.append("pr", pr);

  const HandleProfileClic = () => {
    navigate("/profile");
  };

  const HandleEditClic = () => {
    navigate("/profile/edit");
  };

  const HandleReviewClic = () => {
    navigate("/profile/review");
  };

  const HandleAdminClic = () => {
    navigate("/profile/admin");
  };

  const handleEdit = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/edit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(), //エンコードされたデータを送信
      });

      if (response.ok) {
        const text = await response.text();
        navigate("/profile"); // プロフィール画面に戻って変化を確認する
      } else {
        const errorData = await response.json(); // エラーメッセージを取得
        alert(errorData.message || "Profile update failed.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Network error occurred. Please try again.");
      navigate("/profile");
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
              placeholder="Usename"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </h2>

          <h2>
            Grade <br />
            <input
              type="text"
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

          <button onClick={handleEdit}>Edit</button>
        </div>

        <div id="buttons">
          <div className="button" onClick={() => HandleProfileClic()}>
            <p>Home</p>
          </div>
          <div className="button" onClick={() => HandleEditClic()}>
            <p>Edit</p>
          </div>
          <div className="button" onClick={() => HandleReviewClic()}>
            <p>Review</p>
          </div>
          <div className="button" onClick={() => HandleAdminClic()}>
            <p>Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileEdit;
