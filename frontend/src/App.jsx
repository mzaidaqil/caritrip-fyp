import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import UserSignupPage from './pages/UserSignupPage.jsx';
import UserLoginPage from './pages/UserLoginPage.jsx';


function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <div className="pages">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/app/user/signup" element={<UserSignupPage />} />
              <Route path="/app/user/login" element={<UserLoginPage />} />
            </Routes>
          </div>
        </BrowserRouter>
    </div>
  );
}

export default App;
