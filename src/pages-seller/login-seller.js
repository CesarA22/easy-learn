import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles-seller/login-seller.css';
import { AuthContext } from '../context/AuthContext';

function LoginSeller() {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/seller/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok && data.userData) {
                // Garantir que o token está incluído nos dados do usuário
                const userData = {
                    ...data.userData,
                    token: data.userData.token || data.token
                };
                
                await login(userData, 'seller');
                navigate('/dashboard');
            } else {
                setError(data.error || 'Login failed');
            }
        } catch (err) {
            setError('Erro ao fazer login.');
        } finally {
            setLoading(false);
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
                        disabled={loading}
                    />
                    <input
                        type="password"
                        placeholder="Sua senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={loading}
                    />
                    <button 
                        type="submit" 
                        className="login__btn"
                        disabled={loading}
                    >
                        {loading ? 'Entrando...' : 'Entrar'}
                    </button>
                </form>
                <div className="register-link">
                    <p>
                        Não tem uma conta? <span onClick={() => navigate('/create-account-seller')}>Crie uma conta</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LoginSeller;