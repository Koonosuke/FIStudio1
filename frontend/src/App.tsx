import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Admins from "./Admins";
import ChatList from "./ChatList";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chat" element={<ChatList />} />
        <Route path="/admin" element={<Admins />} />
      </Routes>
    </Router>
  );
}

export default App;
