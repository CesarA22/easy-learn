import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles-buyer/available-products.css';
import { AuthContext } from '../context/AuthContext.js';

function AvailableProducts() {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found');
            return;
        }
        console.log(token);
        if (!user) return;

        const fetchProducts = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/products/item`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log('Fetched products:', data);
                setProducts(data);
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };

        fetchProducts();
    }, [user]);

    return (
        <div className="produtos-disponiveis-container">
            <aside className="sidebar">
                <div className="logo" onClick={() => navigate('/')}>
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
                        {user ? user.name : 'Nome do perfil'}
                    </p>
                </div>
            </aside>
            <main className="main-content">
                <header>
                    <h1>Boas-vindas, {user ? user.name : 'Nome do perfil'}</h1>
                </header>

                <section className="summary">
                    <div className="summary-item">
                        <p>Conteúdos comprados:</p>
                    </div>
                    <div className="summary-item">
                        <p>Selecione uma categoria</p>
                        <span>Exemplo1</span>
                    </div>
                    <div className="summary-item">
                        <p>Selecione um preço</p>
                        <span>R$ 0.00 - R$ 10.00</span>
                    </div>
                </section>
                <div className="products__container">
                    {products.length === 0 ? (
                        <p>Nenhum produto disponível</p>
                    ) : (
                        products.map((product) => (
                            <section className="product" key={product.id}>
                                <h2>{product.name}</h2>
                                <div className="product-content">
                                    <div className="product-item">
                                        <div className="product-image" />
                                        <div>
                                            <p>{product.name}</p>
                                            <p>{product.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
}

export default AvailableProducts;
