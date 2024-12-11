import { useEffect, useState } from "react";
import Header from "./components/Header";
import "./Notification.css";

interface Notification {
    subject: string;
    value: string;
}

function Notification(){
    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try{
                const response = await fetch("http://localhost:8080/api/notifications",{
                    method: "GET",
                    headers:{
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });
                if (!response.ok){
                    throw new Error("Failed to fetch notifications");
                }
                const data: Notification[] = await response.json();
                setNotifications(data);
            }catch (error){
                console.error("Error fetching notifications:", error);
            }
        };
        fetchNotifications();
    },[]);
    
    return(
        <div>
            <Header />
            <div className="notification">
                <aside className="sidebar">
                    <ul>
                        <li className="sidebar-item"><a id="link" href="/notification/add">お知らせを追加</a></li>
                        <li className="sidebar-item"><a id="link" href="/notification">受信したお知らせ</a></li>
                        <li className="sidebar-item"><a id="link" href="/notification/send">送ったお知らせ</a></li>
                    </ul>
                </aside>
                <section className="notices">
                    {notifications.length > 0 ? (
                        notifications.map((notice, index) => (
                        <div className="notice-item" key={index}>
                            <p className="head">件名:{notice.subject}</p>
                            <p className="body">内容:{notice.value}</p>
                        </div>
                    ))
                )　:　(
                        <p>お知らせはありません．</p>
                    )}
                </section>
            </div>
        </div>
    );
}

export default Notification;