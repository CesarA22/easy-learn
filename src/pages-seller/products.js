import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles-seller/products.css';
import { AuthContext } from '../context/AuthContext';

function Products() {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserProducts = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login-seller');
                    return;
                }

                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/seller/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Falha ao buscar produtos');
                }

                const data = await response.json();
                console.log('Dados do usuário e produtos:', data);

                if (data.result && data.result.Products) {
                    setProducts(data.result.Products);
                }
            } catch (error) {
                console.error('Erro ao buscar produtos do usuário:', error);
                setError('Erro ao carregar produtos');
            } finally {
                setLoading(false);
            }
        };

        fetchUserProducts();
    }, [navigate]);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(price);
    };

    const handleProductClick = (id) => {
        navigate(`/products/${id}`);
    };

    if (loading) {
        return (
            <div className="user-screen-container">
                <aside className="sidebar">
                    <div className="logo">Easy Learn</div>
                    <nav className="menu">
                        <ul>
                            <li onClick={() => navigate('/dashboard')}>Dashboard</li>
                            <li onClick={() => navigate('/products')}>Produtos</li>
                            <li>Vendas</li>
                            <li>Finanças</li>
                        </ul>
                    </nav>
                    <div className="settings">
                        <p>Configurações</p>
                        <p onClick={() => navigate('/user-screen-seller')}>
                            {user?.name || 'Nome do perfil'}
                        </p>
                    </div>
                </aside>
                <main className="main-content">
                    <div className="loading">Carregando produtos...</div>
                </main>
            </div>
        );
    }

    return (
        <div className="user-screen-container">
            <aside className="sidebar">
                <div className="logo" onClick={() => navigate('/login-seller')}>
                    Easy Learn
                </div>
                <nav className="menu">
                    <ul>
                        <li onClick={() => navigate('/dashboard')}>Dashboard</li>
                        <li onClick={() => navigate('/products')}>Produtos</li>
                        <li>Vendas</li>
                        <li>Finanças</li>
                    </ul>
                </nav>
                <div className="settings">
                    <p>Configurações</p>
                    <p onClick={() => navigate('/user-screen-seller')}>
                        {user ? user.name : 'Nome do perfil'}
                    </p>
                </div>
            </aside>
            <main className="main-content">
                <header>
                    <h1>Bem-vindo, {user ? user.name.split(' ')[0] : 'Usuário'}</h1>
                    <h2>Seus Produtos</h2>
                </header>
                <section className="profile-actions">
                    <button onClick={() => navigate('/create-product')} className="edit-button">
                        Adicionar Produto
                    </button>
                </section>
                <section className="products-section">
                    {error && <div className="error-message">{error}</div>}
                    
                    {products.length > 0 ? (
                        <div className="product-grid">
                            {products.map((product) => (
                                <div
                                    key={product.id}
                                    className="product-card"
                                    onClick={() => handleProductClick(product.id)}
                                >
                                    <div className="product-image">
                                        <img
                                            src={`${process.env.REACT_APP_BACKEND_URL}/images/${product.image}`}
                                            alt={product.title}
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = '/placeholder-image.jpg';
                                            }}
                                        />
                                    </div>
                                    <div className="product-info">
                                        <h3>{product.title}</h3>
                                        <p className="product-category">
                                            {product.category.name}
                                        </p>
                                        <p className="product-description">
                                            {product.description.length > 100 
                                                ? `${product.description.substring(0, 100)}...` 
                                                : product.description
                                            }
                                        </p>
                                        <p className="product-price">
                                            {formatPrice(product.price)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="no-products">
                            <p>Você ainda não tem nenhum produto cadastrado.</p>
                            <button 
                                onClick={() => navigate('/create-product')}
                                className="create-product-button"
                            >
                                Cadastrar Primeiro Produto
                            </button>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}

export default Products;