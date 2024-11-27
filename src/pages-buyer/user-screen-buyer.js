import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles-buyer/user-screen-buyer.css';
import { AuthContext } from '../context/AuthContext';
import { Sidebar } from '../components/sidebar';
import { SlidingCart } from '../components/sliding-cart';

function UserScreenBuyer() {
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login-buyer');
                return;
            }

            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/buyer/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }

                const data = await response.json();
                setUserData(data.result);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('Failed to load user data');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [navigate]);

    const handleLogout = () => {
        logout();
        navigate('/login-buyer');
    };

    if (loading) {
        return (
            <div className="user-screen-container">
                <Sidebar />
                <SlidingCart />
                <main className="main-content">
                    <div className="loading">Loading user data...</div>
                </main>
            </div>
        );
    }

    if (error) {
        return (
            <div className="user-screen-container">
                <Sidebar />
                <SlidingCart />
                <main className="main-content">
                    <div className="error">{error}</div>
                </main>
            </div>
        );
    }

    return (
        <div className="user-screen-container">
            <Sidebar />
            <SlidingCart />
            <main className="main-content">
                <header>
                    <h1>Configurações</h1>
                </header>
                <section className="profile">
                    <h2>Perfil</h2>
                    <div className="profile-content">
                        <div className="profile-picture">
                            <div className="picture">
                                {userData?.name?.[0]?.toUpperCase() || 'N'}
                            </div>
                            <div className="edit-icon">+</div>
                        </div>
                        <div className="profile-details">
                            <p>
                                <strong>Nome:</strong> {userData?.name || 'Nome não disponível'}
                            </p>
                            <p>
                                <strong>Documento:</strong> {userData?.cpf || 'CPF não disponível'}
                            </p>
                            <p>
                                <strong>Telefone:</strong>{' '}
                                {userData?.phone || 'Telefone não disponível'}
                            </p>
                            <p>
                                <strong>Email:</strong> {userData?.email || 'Email não disponível'}
                            </p>
                            <p>
                                <strong>Idioma:</strong> Português
                            </p>
                            <p>
                                <strong>Status da Conta:</strong>{' '}
                                <span className="verified">Dados Verificados</span>
                            </p>
                        </div>
                    </div>
                    <button className="edit-button">Editar</button>
                </section>

                <section className="purchase-history">
                    <h2>Histórico de Compras</h2>
                    <div className="history-content">
                        <div className="history-stats">
                            <div className="history-stat">
                                <span>Total de Compras</span>
                                <strong>{userData?.products?.length || 0}</strong>
                            </div>
                            <div className="history-stat">
                                <span>Último Pedido</span>
                                <strong>22/03/2024</strong>
                            </div>
                            <div className="history-stat">
                                <span>Status</span>
                                <strong className="status-active">Ativo</strong>
                            </div>
                        </div>

                        <div className="history-list">
                            {/* Aqui você pode adicionar uma lista dos últimos pedidos quando implementar */}
                            <p className="history-empty">Histórico de compras em breve...</p>
                        </div>
                    </div>
                </section>

                <button className="logout-button" onClick={handleLogout}>
                    Logout
                </button>
            </main>
        </div>
    );
}

export default UserScreenBuyer;
