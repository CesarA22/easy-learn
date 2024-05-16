import React from 'react';
import './src/styles/login.css';

function Login() {
  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Faça seu login</h1>
        <form>
          <input type="email" placeholder="Seu email" />
          <input type="password" placeholder="Sua senha" />
          <button type="submit">Fazer login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
