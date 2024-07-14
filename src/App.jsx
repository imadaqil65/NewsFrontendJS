import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Header from './components/header/Header';
import Footer from './components/Footer/Footer';
import ProtectedRoute from "./components/ProtectedRoute.jsx";

// Pages
import News from './pages/News.jsx';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';
import Profile from './pages/Profile.jsx';
import JournalistSignUp from "./pages/JournalistSignUp.jsx";
import Article from "./pages/Article.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import Home from "./pages/HomePage.jsx";
import RoleProtectedRoute from "./components/RoleProtectedRoute.jsx";
import CreateArticle from "./pages/CreateArticle.jsx";
import LoginProtectedRoute from "./components/LoginProtectedRoute.jsx";
import Notification from "./pages/Notification.jsx";
import JournalistArticle from "./pages/JournalistArticles.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import EditArticle from "./pages/EditArticle.jsx";
import Topic from "./pages/Topic.jsx";
import { useState, useEffect } from "react";
import NotificationModal from "./components/Modal/NotificationModal.jsx";
import { Client } from '@stomp/stompjs';
import WEBSOCKET_URL from "./apis/WebsocketConfig.js";
import AdminSignUp from "./pages/AdminSignUp.jsx";

function App() {
  const [stompClient, setStompClient] = useState();
  const [messagesReceived, setMessagesReceived] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const client = new Client({
      brokerURL: WEBSOCKET_URL,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000
    });

    client.onConnect = () => {
      client.subscribe('/topic/publicmessages', (data) => {
        console.log(data);
        onMessageReceived(data);
      });
    };

    client.activate();
    setStompClient(client);

    return () => {
      if (client) {
        client.deactivate();
      }
    };
  }, []);

  const onMessageReceived = (data) => {
    const message = JSON.parse(data.body);
    setMessagesReceived(messagesReceived => [...messagesReceived, message]);
    setNotification(message);
    setShowNotification(true);
  };

  const handleCloseNotification = () => setShowNotification(false);

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/Error" element={<ErrorPage />} />
          <Route path="/" element={<Home />} />
          <Route path="/News" element={<News />} />
          <Route path="/Article/:id" element={<Article />} />
          <Route path="/signup" element={
            <LoginProtectedRoute>
              <Signup />
            </LoginProtectedRoute>
          } />
          <Route path="/login" element={
            <LoginProtectedRoute>
              <Login />
            </LoginProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/reset" element={<ResetPassword />} />
          <Route path="/notification" element={
            <ProtectedRoute>
              <Notification />
            </ProtectedRoute>
          } />
          <Route path="/signup/journalist" element={
            <RoleProtectedRoute role="ADMIN">
              <JournalistSignUp />
            </RoleProtectedRoute>
          } />
          <Route path="/signup/admin" element={
            <RoleProtectedRoute role="ADMIN">
              <AdminSignUp />
            </RoleProtectedRoute>
          } />
          <Route path="/topic" element={<Topic />} />
          <Route path="/journalist-articles" element={
            <RoleProtectedRoute role="JOURNALIST">
              <JournalistArticle />
            </RoleProtectedRoute>
          } />
          <Route path="/create-article" element={
            <RoleProtectedRoute role="JOURNALIST">
              <CreateArticle stompClient={stompClient} />
            </RoleProtectedRoute>
          } />
          <Route path="/edit-article/:id" element={
            <RoleProtectedRoute role="JOURNALIST">
              <EditArticle />
            </RoleProtectedRoute>
          } />
        </Routes>
        <Footer />
      </Router>
      <NotificationModal
        show={showNotification}
        handleClose={handleCloseNotification}
        notification={notification}
      />
    </>
  )
}

export default App;
