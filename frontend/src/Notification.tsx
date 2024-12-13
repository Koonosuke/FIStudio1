import { useEffect, useState } from "react";
import Header from "./components/Header";
import "./Notification.css";

interface Notification {
    userId: Number;
    subject: string;
    value: string;
}

function Notification(){
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [adminUserIds, setAdminUserIds] = useState<Number[]>([]);

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
    
    useEffect(() => {
        const fetchAdminStatus = async () => {
            const adminIds: Number[] = [];
            for (const notice of notifications){
                try{
                    const response = await fetch(
                        `http://localhost:8080/api/isAdmin?userId=${notice.userId}`,
                        {
                            method: "GET",
                            credentials: "include",
                        }
                    );
                    if (!response.ok){
                        throw new Error(`Failed to check admin status for userId: ${notice.userId}`);
                    }
                    const isAdmin = await response.json();
                    if(isAdmin){
                        adminIds.push(notice.userId);
                    }
                }catch (error){
                    console.error("Error checking admin status:",error);
                }
            }
            setAdminUserIds(adminIds);
        };

        if(notifications.length > 0){
            fetchAdminStatus();
        }
    },[notifications]);
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
                        [...notifications].reverse().map((notice, index) => (
                        <div 
                            className={`notice-item ${adminUserIds.includes(notice.userId) ? "admin-notice" : "" }`}
                            key={index}>
                            <p className="head"><h2>件名:{notice.subject}</h2></p>
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