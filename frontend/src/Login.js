import { useState } from "react"; //Reactのフックで、コンポーネント内で状態を管理
import { useNavigate } from "react-router-dom"; //React Routerからのフック→ページの遷移
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    //asyncはavaScriptの非同期処理を行うための構文README.mdにて解説
    const response = await fetch("http://localhost:8080/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded", //リクエストボディのデータの形式
      },
      body: new URLSearchParams({ email, password }), //key=value 形式でデータをURLエンコードするためのオブジェクト
    });

    const text = await response.text();
    if (text === "Login successful") {
      navigate("/home");
    } else {
      alert("Invalid email or password");
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
