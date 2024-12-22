import { useEffect, useState } from "react";
import Header from "./components/Header";
import "./Notification.css";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

interface Notification{
    subject: string;
    value: string;
}

interface User{
    id: Number;
}
function SentNotification(){
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [userId, setUserId] = useState<User | null>(null);

    useEffect(() => {
        const fetchNotifications = async() =>{
            if (!userId) return;
            try{
                const id = String(userId);
                const response = await fetch(`${API_BASE_URL}/api/notifications/self?userId=${id}`,{
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
            }catch(error){
                console.error("Error fetching notifications: ", error);
            }
        };
        fetchNotifications();
    },[userId]);
    useEffect(() =>{
        const response = fetch(`${API_BASE_URL}/api/user`,{
            method: "GET",
            credentials: "include",
        })
        .then((response)=>{
            if(!response.ok){
                throw new Error("User data fetch failed");
            }
            return response.json();
        })
        .then((data) =>{
            setUserId(data.id);
        })
        .catch((error)=>{
            console.error("Error fetching user info: ", error);
        })
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
                        [...notifications].reverse().map((notice, index) => (
                        <div className="notice-item" key={index}>
                            <p className="head"><h2>件名:{notice.subject}</h2></p>
                            <p className="body"><h2>内容:{notice.value}</h2></p>
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

export default SentNotification;