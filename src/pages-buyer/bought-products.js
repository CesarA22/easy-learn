import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles-buyer/bought-products.css';
import { AuthContext } from '../context/AuthContext.js';
import { Sidebar } from '../components/sidebar.js';
import { Product } from '../components/product-card.js';
import { SlidingCart } from '../components/sliding-cart.js';

function BoughtProducts() {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('todos');
    const [categories, setCategories] = useState(['todos']);

    const handleProductClick = (product) => {
        navigate(`/view-bought-product/${product.id}`);
    };

    useEffect(() => {
        const fetchBoughtProducts = async () => {
            if (!user?.id) {
                setLoading(false);
                return;
            }

            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Token não encontrado');
                }

                // Buscar os pedidos do usuário
                const response = await fetch(
                    `${process.env.REACT_APP_BACKEND_URL}/buyer/orders/${user.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error('Erro ao buscar pedidos');
                }

                const data = await response.json();
                console.log('Dados recebidos:', data); // Debug

                if (!data || !Array.isArray(data)) {
                    throw new Error('Formato de dados inválido');
                }

                // Extrair produtos únicos de todos os pedidos
                const boughtProducts = data.reduce((acc, order) => {
                    // Verificar se order.items existe e é um array
                    if (!order.items || !Array.isArray(order.items)) return acc;

                    const orderProducts = order.items.map(item => ({
                        id: item.product.id,
                        name: item.product.title, // Ajustado para 'name' para compatibilidade com o Product
                        title: item.product.title,
                        description: item.product.description,
                        price: item.product.price,
                        image: item.product.image,
                        categories: item.product.category ? [item.product.category.name] : [],
                        purchaseDate: order.createdAt
                    }));

                    return [...acc, ...orderProducts];
                }, []);

                console.log('Produtos processados:', boughtProducts); // Debug

                // Remover duplicatas mantendo apenas a compra mais recente
                const uniqueProducts = Array.from(
                    new Map(
                        boughtProducts.map(item => [item.id, item])
                    ).values()
                );

                setProducts(uniqueProducts);

                // Extrair categorias únicas
                const allCategories = new Set(
                    uniqueProducts.flatMap(product => product.categories || [])
                );
                setCategories(['todos', ...Array.from(allCategories)]);

            } catch (err) {
                console.error('Erro ao buscar produtos:', err);
                setError('Erro ao carregar produtos comprados');
            } finally {
                setLoading(false);
            }
        };

        fetchBoughtProducts();
    }, [user]);

    const filteredProducts = products.filter((product) =>
        selectedCategory === 'todos' ? true : product.categories?.includes(selectedCategory)
    );

    if (loading) {
        return (
            <div className="produtos-comprados">
                <Sidebar />
                <SlidingCart />
                <main className="produtos-comprados__container">
                    <div className="loading-message">Carregando produtos...</div>
                </main>
            </div>
        );
    }

    if (error) {
        return (
            <div className="produtos-comprados">
                <Sidebar />
                <SlidingCart />
                <main className="produtos-comprados__container">
                    <div className="error-message">{error}</div>
                </main>
            </div>
        );
    }

    return (
        <div className="produtos-comprados">
            <Sidebar />
            <SlidingCart />
            <main className="produtos-comprados__container">
                <header>
                    <h1 className="produtos-comprados__welcome">
                        Boas-vindas, {user ? user.name : 'Nome do perfil'}
                    </h1>
                </header>

                <section className="produtos-comprados__header">
                    <div className="produtos-comprados__header__text">
                        <h2>Conteúdos comprados:</h2>
                        <span>(total {products.length})</span>
                    </div>
                    <div className="produtos-comprados__header__filters">
                        <div className="select-container">
                            <label htmlFor="category-select">Categoria:</label>
                            <select
                                id="category-select"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="select-input"
                            >
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </section>
                <div className="produtos-comprados__list">
                {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <div key={product.id} onClick={() => handleProductClick(product)}>
                                <Product product={product} />
                            </div>
                        ))
                    ) : (
                        <div className="no-products-message">
                            {selectedCategory === 'todos'
                                ? 'Você ainda não possui produtos comprados.'
                                : `Nenhum produto encontrado na categoria ${selectedCategory}.`}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default BoughtProducts;