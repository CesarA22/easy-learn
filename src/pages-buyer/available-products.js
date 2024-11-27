import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles-buyer/available-products.css';
import { AuthContext } from '../context/AuthContext.js';
import { Sidebar } from '../components/sidebar.js';
import { Product } from '../components/product-card.js';
import { SlidingCart } from '../components/sliding-cart.js';

function AvailableProducts() {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('todos');
    const [priceOrder, setPriceOrder] = useState('sem ordem');
    const [categories, setCategories] = useState(['todos']);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found');
                }

                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/products`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }

                const data = await response.json();

                const formattedProducts = data.products.map((product) => ({
                    id: product.id,
                    name: product.title,
                    categories: [product.category.name],
                    description: product.description,
                    url: `/consume-product/${product.id}`,
                    price: product.price,
                    image: product.image,
                    content: product.content,
                    author: product.author,
                    files: product.File,
                }));

                setProducts(formattedProducts);

                const uniqueCategories = ['todos'];
                const categorySet = new Set(data.products.map((product) => product.category.name));
                uniqueCategories.push(...categorySet);
                setCategories(uniqueCategories);
            } catch (error) {
                console.error('Error fetching products:', error);
                setError('Erro ao carregar produtos. Por favor, tente novamente.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const orderedProducts = products
        .filter(
            (product) =>
                selectedCategory === 'todos' || product.categories.includes(selectedCategory),
        )
        .sort((a, b) => {
            if (priceOrder === 'menor preco') {
                return a.price - b.price;
            } else if (priceOrder === 'maior preco') {
                return b.price - a.price;
            }
            return 0;
        });

    if (loading) {
        return (
            <div className="produtos-disponiveis">
                <Sidebar />
                <SlidingCart />
                <main className="produtos-disponiveis__container">
                    <div className="loading-message">Carregando produtos...</div>
                </main>
            </div>
        );
    }

    if (error) {
        return (
            <div className="produtos-disponiveis">
                <Sidebar />
                <SlidingCart />
                <main className="produtos-disponiveis__container">
                    <div className="error-message">{error}</div>
                </main>
            </div>
        );
    }

    return (
        <div className="produtos-disponiveis">
            <Sidebar />
            <SlidingCart />
            <main className="produtos-disponiveis__container">
                <header>
                    <h1 className="produtos-disponiveis__welcome">
                        Boas-vindas, {user ? user.name : 'Nome do perfil'}
                    </h1>
                </header>
                <section className="produtos-disponiveis__header">
                    <div className="produtos-disponiveis__header__text">
                        <h2>Produtos disponíveis:</h2>
                        <span>(total {products.length})</span>
                    </div>
                    <div className="produtos-disponiveis__header__filters">
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
                        <div className="select-container">
                            <label htmlFor="price-select">Preço:</label>
                            <select
                                id="price-select"
                                value={priceOrder}
                                onChange={(e) => setPriceOrder(e.target.value)}
                                className="select-input"
                            >
                                <option value="sem ordem">Sem ordem</option>
                                <option value="menor preco">Menor preço</option>
                                <option value="maior preco">Maior preço</option>
                            </select>
                        </div>
                    </div>
                </section>
                <div className="produtos-disponiveis__list">
                    {orderedProducts.length > 0 ? (
                        orderedProducts.map((product) => (
                            <Product
                                key={product.id}
                                product={product}
                                onClick={() => navigate(`/consume-product/${product.id}`)}
                            />
                        ))
                    ) : (
                        <div className="no-products-message">
                            {selectedCategory === 'todos'
                                ? 'Nenhum produto disponível no momento.'
                                : `Nenhum produto encontrado na categoria ${selectedCategory}.`}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default AvailableProducts;
