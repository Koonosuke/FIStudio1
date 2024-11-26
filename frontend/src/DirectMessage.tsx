import { Client } from "@stomp/stompjs";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import "./DirectMessage.css";

interface Message {
  id: number;
  senderEmail: string;
  receiverEmail: string;
  content: string;
  sentAt: string;
}

function DirectMessage() {
  const { receiverEmail } = useParams<{ receiverEmail: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null); // セッションから取得するログインユーザー
  const stompClientRef = useRef<Client | null>(null);

  useEffect(() => {
    // ログイン中のユーザーを取得
    fetch("http://localhost:8080/api/user", {
      method: "GET",
      credentials: "include", // セッション情報を送信
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
      .then((data) => setCurrentUserEmail(data.email))
      .catch((error) => console.error("Error fetching current user:", error));
  }, []);

  useEffect(() => {
    // 過去のメッセージを取得
    if (receiverEmail && currentUserEmail) {
      fetch(
        `http://localhost:8080/api/messages/conversation?userEmail1=${currentUserEmail}&userEmail2=${receiverEmail}`
      )
        .then((response) => response.json())
        .then((data) => setMessages(data))
        .catch((error) =>
          console.error("Error fetching past messages:", error)
        );
    }

    // WebSocket接続の初期化
    const socket = new SockJS("http://localhost:8080/ws");
    const stompClient = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        setIsConnected(true); // 接続が確立されたことを設定
        stompClient.subscribe("/topic/public", (message) => {
          if (message.body) {
            const receivedMessage = JSON.parse(message.body) as Message;
            setMessages((prevMessages) => [...prevMessages, receivedMessage]);
          }
        });
      },
      onDisconnect: () => {
        setIsConnected(false); // 接続が切断されたときの処理
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
        setIsConnected(false);
      }
    };
  }, [receiverEmail, currentUserEmail]);

  const handleSendMessage = () => {
    if (
      newMessage.trim() &&
      receiverEmail &&
      isConnected &&
      stompClientRef.current?.connected &&
      currentUserEmail // currentUserEmail をチェック
    ) {
      const message = {
        senderEmail: currentUserEmail,
        receiverEmail: receiverEmail,
        content: newMessage,
        sentAt: new Date().toISOString(),
      };

      stompClientRef.current.publish({
        destination: "/app/chat.sendMessage",
        body: JSON.stringify(message),
      });

      setNewMessage("");
    } else {
      console.error(
        "WebSocket connection is not established, message is empty, or currentUserEmail is null."
      );
    }
  };

  return (
    <div className="chat-container">
      <h2>Direct Messages with {receiverEmail}</h2>
      <div className="message-list">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message-item ${
              message.senderEmail === currentUserEmail ? "sent" : "received"
            }`}
          >
            <p>
              <strong>{message.senderEmail}:</strong> {message.content}
            </p>
            <small>{message.sentAt}</small>
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={handleSendMessage} disabled={!isConnected}>
          Send
        </button>
      </div>
    </div>
  );
}

export default DirectMessage;
