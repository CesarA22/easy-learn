// src/App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CreateAccount from './pages/create-account.js';
import DashboardUser from './pages/dashboard-user.js';
import LandingPage from './pages/landing-page.js';
import Login from './pages/login.js';
import Products from './pages/products.js';
import UserScreen from './pages/user-screen.js';
import './styles/landing-page.css';
import './styles/create-account.css';
import './styles/dashboard-user.css';
import './styles/login.css';
import './styles/products.css';
import './styles/user-screen.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/dashboard-user" element={<DashboardUser />} />
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/user-screen" element={<UserScreen />} />
      </Routes>
    </div>
  );
}

export default App;
