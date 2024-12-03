import Header from "./components/Header";
import "./Notification.css";
function Notification(){
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
                    <div className="notice-item">お知らせ</div>
                    <div className="notice-item">お知らせ</div>
                    <div className="notice-item">お知らせ</div>
                    <div className="notice-item">お知らせ</div>
                </section>
            </div>
        </div>
    );
}

export default Notification;