import { Client } from "@stomp/stompjs";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import SockJS from "sockjs-client";

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
  const currentUserEmail = "22fi041@ms.dendai.ac.jp"; // ログインしているユーザーのメールアドレス
  const stompClientRef = useRef<Client | null>(null);

  useEffect(() => {
    // 過去のメッセージを取得
    if (receiverEmail) {
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
  }, [receiverEmail]);

  const handleSendMessage = () => {
    if (
      newMessage.trim() &&
      receiverEmail &&
      isConnected &&
      stompClientRef.current?.connected
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
        "WebSocket connection is not established or message is empty."
      );
    }
  };

  return (
    <div>
      <h2>Direct Messages with {receiverEmail}</h2>
      <div className="message-list">
        {messages.map((message, index) => (
          <div key={index} className="message-item">
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
