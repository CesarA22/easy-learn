// src/components/CreateAccount.js
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/create-account.css';

function CreateAccount() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [fone, setFone] = useState('');
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
        body: JSON.stringify({ name, email, password, confirmPassword, cpf, fone })
      });

      const data = await response.json();

      if (response.ok) {
        setUser({ name, email });
        navigate('/user-screen');
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
    <div className="create-account-container">
      <div className="create-account-box">
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
            type="text"
            placeholder="Seu CPF"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
          <input
            type="text"
            placeholder="Seu telefone"
            value={fone}
            onChange={(e) => setFone(e.target.value)}
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
        <div className="login-link">
          <p>Já tem uma conta? <Link to="/login">Faça login</Link></p>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
