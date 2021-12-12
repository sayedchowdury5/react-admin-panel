import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faEdit, faHome, faMusic, faVideo, faBookOpen, faUserFriends, faUserCog, faArrowCircleLeft, faArrowCircleRight, faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import LoginComponent from './components/LoginComponent';
import LogoutComponent from './components/LogoutComponent';
import AdminpanelLayout from './components/AdminpanelLayout';
import BookComponent from './components/BookComponent';
import DashboardComponent from './components/DashboardComponent';
import AudioComponent from './components/AudioComponent';
import VideoComponent from './components/VideoComponent';
import UserComponent from './components/UserComponent';
import ProfileComponent from './components/ProfileComponent';
import PageNotFound from './components/PageNotFound';
import CarouselComponent from './components/Carousel';
library.add(fab, faEdit, faTrashAlt, faHome, faMusic, faVideo, faBookOpen, faUserFriends, faUserCog, faArrowCircleLeft, faArrowCircleRight, faAngleDoubleRight, faAngleDoubleLeft)

function App() {
  useEffect(() => { document.body.style.backgroundColor = 'whitesmoke' }, [])
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token");

  //finishing state
  const logOut = () => {
    localStorage.clear();
    navigate('/');
  }
  
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<LoginComponent />} />
          <Route path="/admin/*" element={isAuthenticated ? <AdminpanelLayout logOut={logOut} /> : <Navigate to="/" />} >
            <Route path="logout" element={<LogoutComponent />} />
            <Route path="carousel" element={<CarouselComponent />} />
            <Route path="dashboard" element={<DashboardComponent />} />
            <Route path="book" element={<BookComponent />} />
            <Route path="audio" element={<AudioComponent />} />
            <Route path="video" element={<VideoComponent />} />
            <Route path="user" element={<UserComponent />} />
            <Route path="profile" element={<ProfileComponent />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
    </div>
  );
}

export default App;
