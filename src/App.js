// src/App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './src/pages/login';
import CreateAccount from './src/pages/create-account';
import DashboardUser from './src/pages/dashboard-user';
import UserScreen from './src/pages/user-screen';
import './src/styles/login.css';
import './src/styles/create-account.css';
import './src/styles/dashboard-user.css';
import './src/styles/user-screen.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" component={Login} />
        {/* Coloquei a rota raiz para o login, mas pode ser trocado depois */}
        <Route path="/create-account" component={CreateAccount} />
        <Route path="/dashboard-user" component={DashboardUser} />
        <Route path="/user-screen" component={UserScreen} />
      </Routes>
    </div>
  );
}

export default App;
