import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles-seller/login-seller.css';
import { AuthContext } from '../context/AuthContext.js';

function LoginSeller() {
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/seller/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setUser({ name: data.userData.name, email: data.userData.email });
                navigate('/dashboard');
            } else {
                setError(data.error);
            }
        } catch (err) {
            setError('Erro ao fazer login.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1>Login</h1>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleSubmit} className="login__form">
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
                    <button type="submit" className="login__btn">
                        Entrar
                    </button>
                </form>
                <div className="register-link">
                    <p>
                        Não tem uma conta? <Link to="/create-account-seller">Crie uma conta</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LoginSeller;
