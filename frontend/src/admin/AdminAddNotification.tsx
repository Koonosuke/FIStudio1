import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../AddNotification.css";
import HeaderAdmin from "../components/HeaderAdmin";

interface User {
  id: Int16Array;
}
function AdminAddNotification() {
  const [subject, setSubject] = useState("");
  const [value, setValue] = useState("");
  const [userId, setUserId] = useState<User | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userId === null) {
      console.error("User ID is not available");
      return;
    }
    const notification = { userId, subject, value };
    try {
      const response = await fetch("http://localhost:8080/api/notifications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(notification),
        credentials: "include",
      });

      if (response.ok) {
        navigate("/notificationAdmin");
      } else {
        console.error("Failed to add notification");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    const response = fetch("http://localhost:8080/api/user", {
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
        setUserId(data.id);
      })
      .catch((error) => {
        console.error("Error fetching user info:", error);
      });
  }, []);
  return (
    <div>
      <HeaderAdmin />
      <div className="notification">
        <aside className="sidebar">
          <ul>
            <li className="sidebar-item">
              <a id="link" href="/notificationAdmin/add">
                お知らせを追加
              </a>
            </li>
            <li className="sidebar-item">
              <a id="link" href="/notificationAdmin">
                受信したお知らせ
              </a>
            </li>
            <li className="sidebar-item">
              <a id="link" href="/notificationAdmin/send">
                送ったお知らせ
              </a>
            </li>
          </ul>
        </aside>
        <div className="add-notification">
          <h2>お知らせを追加</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>件名:</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>
            <div>
              <label>内容:</label>
              <textarea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                required
              />
            </div>
            <button type="submit">送信</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminAddNotification;
