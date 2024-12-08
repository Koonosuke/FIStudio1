import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        credentials: "include", // セッション情報を含む
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ email, password }),
      });

      if (response.ok) {
        const text = await response.text();
        if (text === "Admin login successful") {
          navigate("/admin"); // 管理者専用画面
        } else if (text === "Login successful") {
          navigate("/home"); // 一般ユーザー用画面
        } else {
          alert("Unexpected response: " + text);
        }
      } else if (response.status === 401) {
        alert("Invalid email or password. Please try again.");
      } else {
        alert(`Login failed with status: ${response.status}`);
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert(
        "Network error occurred. Please check your connection and try again."
      );
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
