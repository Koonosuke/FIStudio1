import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AddNotification from "./AddNotification";
import AdminAddNotification from "./admin/AdminAddNotification";
import AdminNotification from "./admin/AdminNotification";
import Admins from "./admin/Admins";
import AdminSentNotification from "./admin/AdminSentNotification";
import AdminSubject from "./admin/AdminSubject";
import AdminUserList from "./admin/AdminUserList";
import ChatList from "./ChatList";
import DirectMessage from "./DirectMessage"; // DirectMessageコンポーネントをインポート
import Home from "./Home";
import Login from "./Login";
import Notification from "./Notification";
import Profile from "./Profile";
import ProfileEdit from "./ProfileEdit";
import Register from "./Register";
import SentNotification from "./SentNotification";
import SubjectList from "./SubjectList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/notification/add" element={<AddNotification />} />
        <Route path="/notification/send" element={<SentNotification />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chat" element={<ChatList />} />
        <Route path="/admin" element={<Admins />} />
        <Route path="/notificationAdmin" element={<AdminNotification />}/>
        <Route path="/notificationAdmin/add" element={<AdminAddNotification />}/>
        <Route path="/notificationAdmin/send" element={<AdminSentNotification />}/>
        <Route path="/subjectsAdmin" element={<AdminSubject/>}/>
        <Route path="/user-listAdmin" element={<AdminUserList/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/profile/edit" element={<ProfileEdit/>}/>
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
