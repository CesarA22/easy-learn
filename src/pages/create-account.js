import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './src/create-account.css';

function CreateAccount() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const validatePassword = () => {
    const conditions = [
      { text: 'Pelo menos 8 caracteres', valid: password.length >= 8 },
      { text: 'Pelo menos 1 caractere especial', valid: /[!@#$%^&*]/.test(password) },
      { text: 'Pelo menos 1 número', valid: /\d/.test(password) },
      { text: 'Pelo menos 1 letra minúscula', valid: /[a-z]/.test(password) },
      { text: 'Pelo menos 1 letra maiúscula', valid: /[A-Z]/.test(password) },
      { text: 'As senhas digitadas conferem', valid: password === confirmPassword }
    ];

    return conditions;
  };

  return (
    <div className="create-account-container">
      <div className="create-account-box">
        <h1>Criar conta</h1>
        <form>
          <input type="text" placeholder="Seu nome" />
          <input type="email" placeholder="Seu e-mail" />
          <input type="tel" placeholder="Seu número (com DDD)" />
          <input 
            type="password" 
            placeholder="Sua senha" 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
          />
          <input 
            type="password" 
            placeholder="Repita sua senha" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} 
          />
          <div className="password-conditions">
            {validatePassword().map((condition, index) => (
              <p key={index} className={condition.valid ? 'valid' : 'invalid'}>
                {condition.valid ? '✔️' : '❌'} {condition.text}
              </p>
            ))}
          </div>
          <button type="submit">Criar conta grátis</button>
        </form>
        <div className="login-link">
          <p>Já tem uma conta? <Link to="/login">Faça login</Link></p>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
