import { useEffect, useState } from "react";
import HeaderAdmin from "../components/HeaderAdmin";
import "../Notification.css";
interface Notification{
    subject: string;
    value: string;
}

function AdminNotification(){
    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(()=>{
        const fetchNotifications = async () =>{
            try{
                const response = await fetch("http://localhost:8080/api/notifications",{
                    method: "GET",
                    headers:{
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });
                if(!response.ok){
                    throw new Error("Failed to fetch notifications");
                }
                const data: Notification[] = await response.json();
                setNotifications(data);
            }catch(error){
                console.error("Error fetching notifications:",error);
            }
        };
        fetchNotifications();
    },[]);
    return (
        <div>
            <HeaderAdmin />
            <div className="notification">
                <aside className="sidebar">
                    <ul>
                        <li className="sidebar-item"><a id="link" href="/notificationAdmin/add">お知らせを追加</a></li>
                        <li className="sidebar-item"><a id="link" href="/notificationAdmin">受信したお知らせ</a></li>
                        <li className="sidebar-item"><a id="link" href="/notificationAdmin/send">送ったお知らせ</a></li>
                    </ul>
                </aside>
                <section className="notices">
                    {notifications.length > 0 ? (
                        [...notifications].reverse().map((notice, index) => (
                        <div className="notice-item" key={index}>
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

export default AdminNotification;