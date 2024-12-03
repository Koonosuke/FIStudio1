import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";
import "./Notification.css";

function AddNotification() {
    const [subject, setSubject] = useState("");
    const [value, setValue] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const notification = { subject, value};

        try{
            const response = await fetch("/api/notifications",{
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(notification),
            });

            if (response.ok){
                navigate("/notification")
            }else {
                console.error("Failed to add notification");
            }
        }catch (error){
            console.error("Error:", error);
        }
    };
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

export default AddNotification;