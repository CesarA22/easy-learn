import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/login.css';

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
        <div className="create-account-link">
          <p>Não tem uma conta? <Link to="/create-account">Crie uma conta</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
