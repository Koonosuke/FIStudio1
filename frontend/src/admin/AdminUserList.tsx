import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "../components/ComfirmDialog";
import HeaderAdmin from "../components/HeaderAdmin";
import "./AdminChatList.css";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

interface User {
  username: string;
  email: string;
  grade: Int16Array;
  isDeleteSet: boolean;
}

function AdminUserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null); // ログインユーザー情報
  const navigate = useNavigate();

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

  // ココ確認ダイアログ用の処理
  const handleDelete = (user: User) => {
    setUsers((prevUsers) =>
      prevUsers.map((u) =>
        u.email === user.email
          ? { ...u, isDeleteSet: true }
          : { ...u, isDeleteSet: false } // 他のユーザーのダイアログを非表示に
      )
    );
  };

  const handleConfirm = async (user: User) => {
    const body = new URLSearchParams();
    body.append("email", user.email);
    try {
      const response = await fetch(`${API_BASE_URL}/api/userDelete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(), // エンコードされたデータを送信
      });

      if (response.ok) {
        alert(user.email + " is deleted!");
        setUsers((prevUsers) =>
          prevUsers.filter((u) => u.email !== user.email)
        ); // ユーザーを削除して再レンダリング
      } else {
        alert("Delete failed.");
      }
    } catch (error) {
      alert("Network error occurred. Please try again.");
      navigate("/user-listAdmin");
    }

    setUsers((prevUsers) =>
      prevUsers.map((u) =>
        u.email === user.email ? { ...u, isDeleteSet: false } : u
      )
    );
  };

  const handleCancel = (user: User) => {
    setUsers((prevUsers) =>
      prevUsers.map((u) =>
        u.email === user.email ? { ...u, isDeleteSet: false } : u
      )
    );
  };

  return (
    <div className="p-4">
      <HeaderAdmin />
      <div className="chat-list-container">
        <h2 className="text-3xl font-bold mb-4">User List</h2>
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
                <button
                  onClick={() => handleDelete(user)}
                  className="dm-button mt-4 w-full bg-orange-500 text-white font-bold py-2 px-4 rounded hover:bg-orange-800 transition ease-in-out duration-300"
                >
                  Delete
                </button>
                {user.isDeleteSet && (
                  <ConfirmDialog
                    message="Are you sure you want to delete this user?"
                    user={user}
                    onConfirm={() => handleConfirm(user)}
                    onCancel={() => handleCancel(user)}
                  />
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default AdminUserList;