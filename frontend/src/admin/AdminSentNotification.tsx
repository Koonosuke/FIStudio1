import { useEffect, useState } from "react";
import HeaderAdmin from "../components/HeaderAdmin";
import "../Notification.css";

interface Notification {
  notificationId: number;
  subject: string;
  value: string;
}

interface User {
  id: Number;
}
function AdminSentNotification() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [userId, setUserId] = useState<User | null>(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!userId) return;
      try {
        const id = String(userId);
        const response = await fetch(
          `http://localhost:8080/api/notifications/self?userId=${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch notifications");
        }
        const data: Notification[] = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error("Error fetching notifications: ", error);
      }
    };
    fetchNotifications();
  }, [userId]);

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
        console.error("Error fetching user info: ", error);
      });
  }, []);
  const handleDelete = async (notificationId: number) => {
    try{
      const response = await fetch(
        `http://localhost:8080/api/notifications/self/${notificationId}/delete`,
        {
          method: "DELETE",
          headers:{
            "Content-Type": "application/json",
          },
          credentials:"include",
        }
      );
      if(!response.ok){
        throw new Error("Failed to delete notification");
      }
      setNotifications((prevNotifications) =>
        prevNotifications.filter((notification) => notification.notificationId !== notificationId)
    );
    }catch(error){
      console.error("Error deleting notification: ", error);
    }
  }
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
        <section className="notices">
          {notifications.length > 0 ? (
            [...notifications].reverse().map((notice) => (
              <div className="notice-item" key={notice.notificationId}>
                <p className="head">
                  <h2>件名:{notice.subject}</h2>
                </p>
                <p className="body">
                  <h2>内容:{notice.value}</h2>
                </p>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(notice.notificationId)}
                  >
                    削除
                  </button>
              </div>
            ))
          ) : (
            <p>お知らせはありません．</p>
          )}
        </section>
      </div>
    </div>
  );
}

export default AdminSentNotification;
