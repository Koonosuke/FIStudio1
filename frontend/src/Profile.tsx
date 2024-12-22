import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";
import "./Profile.css";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
interface User {
  username: string;
  email: string;
}

function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

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

  useEffect(() => {
    const response = fetch(`${API_BASE_URL}/api/user`, {
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
        setUser({ username: data.username, email: data.email });
      })
      .catch((error) => {
        console.error("Error fetching user info:", error);
        // エラー時にユーザーをログインページにリダイレクト
        //alert("Time's overed. Please login again.");
        //navigate("/");
      });
  }, []);

  return (
    <div>
      <Header />
      <div id="profile-screen">
        <div id="main-contents">
          <h1>Profile</h1>
          <p>Username: {user?.username || "Not available"}</p>
          <p>Email: {user?.email || "Not available"}</p>
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

export default Profile;
