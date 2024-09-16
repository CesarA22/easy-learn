// src/components/CreateAccountComprador.js
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/create-account-comprador.css';

function CreateAccountComprador() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const conditions = validatePassword();
    const valid = conditions.every(condition => condition.valid);

    if (!valid) {
      setError('Por favor, verifique os requisitos da senha.');
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, confirmPassword })
      });

      const data = await response.json();

      if (response.ok) {
        setUser({ name, email });
        navigate('/user-screen-comprador');
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Erro ao criar conta.');
    }
  };

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
    <div className="create-account-comprador-container">
      <div className="create-account-comprador-box">
        <h1>Criar conta</h1>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
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
        <div className="login-comprador-link">
          <p>Já tem uma conta? <Link to="/login-comprador">Faça login</Link></p>
        </div>
      </div>
    </div>
  );
}

export default CreateAccountComprador;
