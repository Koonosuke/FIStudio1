import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AddNotification from "./AddNotification";
import Admins from "./admin/Admins";
import ChatList from "./ChatList";
import DirectMessage from "./DirectMessage"; // DirectMessageコンポーネントをインポート
import Home from "./Home";
import Login from "./Login";
import Notification from "./Notification";
import Profile from "./Profile";
import Register from "./Register";
import SubjectList from "./SubjectList";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/notification/add" element={<AddNotification />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chat" element={<ChatList />} />
        <Route path="/admin" element={<Admins />} />
        <Route path ="/profile" element={<Profile/>}/>
        <Route path="/subjects" element={<SubjectList />} />
        <Route
          path="/direct-message/:receiverEmail"
          element={<DirectMessage />}
        />{" "}
        {/* 新しいルート */}
      </Routes>
    </Router>
  );
}

export default App;
