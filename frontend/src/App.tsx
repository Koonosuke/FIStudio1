import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ChatList from "./ChatList";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chat" element={<ChatList />} />
      </Routes>
    </Router>
  );
};
//岸です
export default App;
