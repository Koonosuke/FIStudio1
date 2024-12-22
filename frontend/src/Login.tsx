import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded", //例：http://localhost:8080/api/login/email=実際に入力されたメール?password=暗号化されたパスワード
        },
        credentials: "include",
        body: new URLSearchParams({ email, password }),
      });

      if (response.ok) {
        const text = await response.text();
        if (text === "Admin login successful") {
          navigate("/admin"); // 管理者専用画面
        } else if (text === "Login successful") {
          navigate("/home"); // 一般ユーザー用画面
        }
      } else {
        alert("Invalid email or password");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Network error occurred. Please try again.");
    }
  };
  const handleSignup = () => {
    navigate("/register");
  };

  return (
    <div className="login-container">
      <h1>FI STUDIO</h1>
      <div className="login-box">
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        <div className="signup-link" onClick={handleSignup}>
          新規登録
        </div>
      </div>
    </div>
  );
}

export default Login;
