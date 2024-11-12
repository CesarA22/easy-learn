import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles-buyer/user-screen-buyer.css';
import { AuthContext } from '../context/AuthContext';

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
                <aside className="sidebar">
                    <div className="logo">Easy Learn</div>
                    <div className="settings">
                        <p>Loading...</p>
                    </div>
                </aside>
                <main className="main-content">
                    <div className="loading">Loading user data...</div>
                </main>
            </div>
        );
    }

    if (error) {
        return (
            <div className="user-screen-container">
                <aside className="sidebar">
                    <div className="logo">Easy Learn</div>
                    <div className="settings">
                        <p>Error</p>
                    </div>
                </aside>
                <main className="main-content">
                    <div className="error">{error}</div>
                </main>
            </div>
        );
    }

    return (
        <div className="user-screen-container">
            <aside className="sidebar">
                <div className="logo" onClick={() => navigate('/available-products')}>
                    Easy Learn
                </div>
                <nav className="menu">
                    <ul>
                        <li onClick={() => navigate('/available-products')}>
                            Produtos disponíveis
                        </li>
                        <li onClick={() => navigate('/bought-products')}>Produtos Comprados</li>
                    </ul>
                </nav>
                <div className="settings">
                    <p>Configurações</p>
                    <p onClick={() => navigate('/user-screen-buyer')}>
                        {userData?.name || 'Nome do perfil'}
                    </p>
                </div>
            </aside>
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
                            {userData?.products && (
                                <p>
                                    <strong>Produtos Comprados:</strong> {userData.products.length}
                                </p>
                            )}
                        </div>
                    </div>
                    <button className="edit-button">Editar</button>
                </section>

                <section className="purchases">
                    <h2>Histórico de Compras</h2>
                    <div className="purchases-content">
                        {userData?.products && userData.products.length > 0 ? (
                            <div className="purchases-stats">
                                <div className="purchases-item">
                                    <p>
                                        <strong>Total de Produtos Comprados</strong>
                                    </p>
                                    <p>{userData.products.length} produtos</p>
                                </div>
                                <button
                                    className="view-products-button"
                                    onClick={() => navigate('/bought-products')}
                                >
                                    Ver Produtos Comprados
                                </button>
                            </div>
                        ) : (
                            <div className="purchases-item">
                                <p>
                                    <strong>Nenhum produto comprado</strong>
                                </p>
                                <p>Explore nossos produtos disponíveis!</p>
                                <button
                                    className="view-products-button"
                                    onClick={() => navigate('/available-products')}
                                >
                                    Ver Produtos Disponíveis
                                </button>
                            </div>
                        )}
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
