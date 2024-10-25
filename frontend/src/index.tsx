import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
// import reportWebVitals from "./reportWebVitals"; // 不要ならコメントアウト

const rootElement = document.getElementById("root");

if (rootElement !== null) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// reportWebVitals(); // 呼び出さない
