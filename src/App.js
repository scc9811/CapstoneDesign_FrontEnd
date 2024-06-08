// import React from 'react';
import MainPage from './pages/MainPage.js';
import React, { useState , useEffect } from 'react';
import axios from 'axios';
import SignUpPage from './pages/SignUpPage.js';
import SignInPage from './pages/SignInPage.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TestPage from './pages/TestPage.js';
import FirewallGuidePage from './pages/FirewallGuidePage.js';




const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/user/signUp" element={<SignUpPage />} />
          <Route path="/user/signIn" element={<SignInPage />} />
          <Route path='/guidePage' element={<FirewallGuidePage />} />
          <Route path="/" element={<MainPage />} />
          {/* <Route path="/" element={<TestPage/>} /> */}
          {/* <Route path="/" element={<SignInPage />} /> */}

        </Routes>
      </div>
    </Router>
  );
}



export default App;