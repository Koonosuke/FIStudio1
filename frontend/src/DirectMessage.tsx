import { Client } from "@stomp/stompjs";
import { useEffect, useRef, useState, } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import "./DirectMessage.css";

interface Message {
  id: number;
  senderEmail: string;
  receiverEmail: string;
  content: string;
  sentAt: string;
  status: string;
}

function DirectMessage() {
  const { receiverEmail } = useParams<{ receiverEmail: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);
  const stompClientRef = useRef<Client | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // ログイン中のユーザーを取得
    fetch("http://localhost:8080/api/user", {
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
        .then((data) => {
          if (data) {
            setMessages(data);
            // 未読メッセージを既読に変更
            data.forEach((message: Message) => {
              if (
                message &&
                message.receiverEmail === currentUserEmail &&
                message.status === "unread"
              ) {
                markMessageAsRead(message.id);
              }
            });
          }
        })
        .catch((error) =>
          console.error("Error fetching past messages:", error)
        );
    }

    // WebSocket接続の初期化
    const socket = new SockJS("http://localhost:8080/ws");
    const stompClient = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        setIsConnected(true);
        stompClient.subscribe("/topic/public", (message) => {
          if (message.body) {
            const receivedMessage = JSON.parse(message.body) as Message;
            if (receivedMessage) {
              setMessages((prevMessages) => [...prevMessages, receivedMessage]);
            }
          }
        });
        stompClient.subscribe("/topic/read-status", (message) => {
          if (message.body) {
            const messageId = JSON.parse(message.body) as number;
            setMessages((prevMessages) =>
              prevMessages.map((msg) =>
                msg.id === messageId ? { ...msg, status: "read" } : msg
              )
            );
          }
        });
      },
      onDisconnect: () => {
        setIsConnected(false);
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

  // メッセージを既読にする処理
  const markMessageAsRead = (messageId: number) => {
    fetch(
      `http://localhost:8080/api/messages/mark-as-read?messageId=${messageId}`,
      {
        method: "POST",
      }
    )
      .then(() => {
        // 既読状態をリアルタイムで通知
        stompClientRef.current?.publish({
          destination: "/app/chat.markAsRead",
          body: JSON.stringify(messageId),
        });
      })
      .catch((error) => console.error("Error marking message as read:", error));
  };

  const handleSendMessage = () => {
    if (
      newMessage.trim() &&
      receiverEmail &&
      isConnected &&
      stompClientRef.current?.connected &&
      currentUserEmail
    ) {
      const message = {
        senderEmail: currentUserEmail,
        receiverEmail: receiverEmail,
        content: newMessage,
        sentAt: new Date().toISOString(),
        status: "unread",
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

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="chat-container">
      <div className="navBar">
        <div className="backButton">
          <h2  onClick={goBack}><u>Back</u></h2>
        </div>
        <h2>Direct Messages with {receiverEmail}</h2>
      </div>
      
      <div className="message-list">
        {messages.map(
          (message, index) =>
            message && (
              <div
                key={index}
                className={`message-item ${
                  message.senderEmail === currentUserEmail ? "sent" : "received"
                }`}
              >
                <p>
                  <strong>
                    {message.senderEmail === currentUserEmail
                      ? "You"
                      : message.senderEmail}
                    :
                  </strong>{" "}
                  {message.content}
                </p>
                {message.status === "read" && (
                  <small className="read-status">既読</small>
                )}
                <small>{message.sentAt}</small>
              </div>
            )
        )}
      </div>
      <div className="message-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={handleSendMessage} disabled={!isConnected}>
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
}

export default DirectMessage;
