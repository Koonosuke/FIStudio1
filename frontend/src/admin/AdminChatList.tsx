import { Client } from "@stomp/stompjs";
import { useEffect, useRef, useState } from "react";
import { FaEnvelope, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SockJS from "sockjs-client";
import HeaderAdmin from "../components/HeaderAdmin";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    interface User {
    username: string;
    email: string;
    }
    interface LatestMessage {
    receiverEmail: string;
    content: string;
    status: string; // メッセージの状態 (既読/未読)
    }

    function AdminChatList() {
    const [users, setUsers] = useState<User[]>([]);
    const [currentUser, setCurrentUser] = useState<User | null>(null); // ログインユーザー情報
    const [latestMessages, setLatestMessages] = useState<{
        [key: string]: LatestMessage | null;
    }>({});
    const [unreadCounts, setUnreadCounts] = useState<{ [key: string]: number }>(
        {}
    );
    const navigate = useNavigate();
    const stompClientRef = useRef<Client | null>(null);

    // ログイン中のユーザーを取得
    useEffect(() => {
        fetch(`${API_BASE_URL}/api/user`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        })
        .then((response) => {
            if (response.ok) {
            return response.json();
            }
            throw new Error("Failed to fetch current user");
        })
        .then((data) => setCurrentUser(data))
        .catch((error) => console.error("Error fetching current user:", error));
    }, []);

    // ユーザー一覧を取得
    useEffect(() => {
        if (currentUser) {
        fetch(`${API_BASE_URL}/api/users`, {
            method: "GET",
            credentials: "include",
            headers: {
            "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => setUsers(data))
            .catch((error) =>
            console.error("There was a problem with the fetch operation:", error)
            );
        }
    }, [currentUser]);

    // 各ユーザーの最新メッセージを取得
    useEffect(() => {
        if (currentUser) {
        users.forEach((user) => {
            if (user.email !== currentUser.email) {
            fetch(
                `${API_BASE_URL}/api/messages/latest?userEmail1=${currentUser.email}&userEmail2=${user.email}`,
                {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                }
            )
                .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Failed to fetch latest message");
                }
                })
                .then((data: LatestMessage) => {
                if (data && data.content) {
                    setLatestMessages((prev) => ({
                    ...prev,
                    [user.email]: data,
                    }));
                    // 未読メッセージ数の更新
                    if (
                    data.status === "unread" &&
                    data.receiverEmail === currentUser.email
                    ) {
                    setUnreadCounts((prev) => ({
                        ...prev,
                        [user.email]: (prev[user.email] || 0) + 1,
                    }));
                    }
                }
                })
                .catch((error) =>
                console.error("Error fetching latest message:", error)
                );
            }
        });
        }
    }, [currentUser, users]);

    // WebSocket 接続の初期化とメッセージのリスニング
    useEffect(() => {
        if (currentUser) {
        const socket = new SockJS(`${API_BASE_URL}/ws`);
        const stompClient = new Client({
            webSocketFactory: () => socket,
            onConnect: () => {
            stompClient.subscribe("/topic/public", (message) => {
                if (message.body) {
                const receivedMessage = JSON.parse(message.body) as LatestMessage;

                // リアルタイムで最新メッセージを更新
                setLatestMessages((prev) => ({
                    ...prev,
                    [receivedMessage.receiverEmail]: receivedMessage,
                }));

                // 未読メッセージのカウント更新
                if (
                    receivedMessage.status === "unread" &&
                    receivedMessage.receiverEmail === currentUser.email
                ) {
                    setUnreadCounts((prev) => ({
                    ...prev,
                    [receivedMessage.receiverEmail]:
                        (prev[receivedMessage.receiverEmail] || 0) + 1,
                    }));
                }
                }
            });
            },
            onStompError: (error) => {
            console.error("STOMP Error", error);
            },
        });

        stompClient.activate();
        stompClientRef.current = stompClient;

        return () => {
            if (stompClient) {
            stompClient.deactivate();
            }
        };
        }
    }, [currentUser]);

    const handleDMClick = (userEmail: string) => {
        navigate(`/direct-message/${userEmail}`);
    };

    return (
        <div className="p-4">
        <HeaderAdmin />
        <div className="chat-list-container">
            <h2 className="text-3xl font-bold mb-4">Direct Messages</h2>
            <div className="user-cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {users
                .filter((user) => user.email !== currentUser?.email) // ログイン中のユーザーを除外
                .map((user) => (
                <div
                    className="user-card shadow-lg p-6 rounded-lg hover:bg-primary hover:text-white transition duration-300 ease-in-out"
                    key={user.email}
                >
                    <div className="flex items-center justify-center mb-4">
                    <FaUserCircle className="text-6xl text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold">{user.username}</h3>
                    <p className="text-md text-gray-300">{user.email}</p>
                    <p className="latest-message mt-2 text-sm">
                    {latestMessages[user.email]?.content ||
                        "メッセージはありません"}
                    </p>
                    {unreadCounts[user.email] > 0 && (
                    <span className="unread-count inline-block mt-2 px-3 py-1 text-sm font-semibold text-error bg-red-200 rounded-full">
                        {unreadCounts[user.email]}件の新着メッセージ
                    </span>
                    )}
                    <button
                    onClick={() => handleDMClick(user.email)}
                    className="dm-button mt-4 w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-800 transition ease-in-out duration-300"
                    >
                    <FaEnvelope className="inline mr-2" /> DM
                    </button>
                </div>
                ))}
            </div>
        </div>
        </div>
    );
    }

    export default AdminChatList;