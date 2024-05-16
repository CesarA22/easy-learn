// src/App.js
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LandingPage from './src/pages/landing-page';
import Login from './src/pages/login';
import CreateAccount from './src/pages/create-account';
import './src/styles/login.css';
import './src/styles/create-account.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/create-account" component={CreateAccount} />
        <Route path="/" component={LandingPage} />
      </Switch>
    </div>
  );
}

export default App;
