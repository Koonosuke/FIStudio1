// DirectMessage.tsx - DMチャット画面
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
  const currentUserEmail = "current_user_email@example.com"; // ログインしているユーザーのメールアドレス

  useEffect(() => {
    fetch(
      `http://localhost:8080/api/messages/conversation?senderEmail=${currentUserEmail}&receiverEmail=${receiverEmail}`
    )
      .then((response) => response.json())
      .then((data) => setMessages(data))
      .catch((error) => console.error("Error fetching messages:", error));
  }, [receiverEmail]);

  const handleSendMessage = () => {
    fetch("http://localhost:8080/api/messages/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        senderEmail: currentUserEmail,
        receiverEmail: receiverEmail || "",
        content: newMessage,
      }).toString(),
    })
      .then((response) => response.json())
      .then((data) => {
        setMessages((prevMessages) => [...prevMessages, data]);
        setNewMessage("");
      })
      .catch((error) => console.error("Error sending message:", error));
  };

  return (
    <div>
      <h2>Direct Messages with {receiverEmail}</h2>
      <div className="message-list">
        {messages.map((message) => (
          <div key={message.id} className="message-item">
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
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default DirectMessage;
