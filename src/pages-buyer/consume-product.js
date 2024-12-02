import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/sidebar.js';
import { SlidingCart } from '../components/sliding-cart.js';
import { useCart } from '../context/CartContext.js';
import { ChevronLeft, ShoppingBag } from 'lucide-react';

function ConsumeProduct() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { addToCart, setIsCartOpen } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/products`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Produto não encontrado');
                }

                const data = await response.json();
                const foundProduct = data.products.find((p) => p.id === parseInt(id));

                if (!foundProduct) {
                    throw new Error('Produto não encontrado');
                }

                setProduct(foundProduct);
            } catch (error) {
                console.error('Error fetching product:', error);
                setError(error.message || 'Erro ao carregar o produto');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (product) {
            addToCart({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                quantity: 1,
            });
            setIsCartOpen(true); // Abre o carrinho ao adicionar um item
        }
    };

    const handleBuyNow = () => {
        handleAddToCart();
        navigate('/purchase-confirmation');
    };

    if (loading) {
        return (
            <div className="consume-product">
                <Sidebar />
                <SlidingCart />
                <main className="consume-product__container">
                    <div className="loading-spinner">Carregando...</div>
                </main>
            </div>
        );
    }

    if (error) {
        return (
            <div className="consume-product">
                <Sidebar />
                <SlidingCart />
                <main className="consume-product__container">
                    <div className="error-message">{error}</div>
                </main>
            </div>
        );
    }

    if (!product) {
        return null;
    }

    return (
        <div className="consume-product">
            <Sidebar />
            <SlidingCart />
            <main className="consume-product__container">
                <header className="product-header">
                    <button onClick={() => navigate('/available-products')} className="back-button">
                        <ChevronLeft size={24} />
                        Voltar
                    </button>
                    <h1>Detalhes do Produto</h1>
                </header>

                <div className="product-content">
                    <div
                        className="product-image"
                        style={{
                            backgroundImage: product.image
                                ? `url(${process.env.REACT_APP_BACKEND_URL}/images/${product.image})`
                                : 'none',
                        }}
                    />

                    <div className="product-info-container">
                        <div className="product-header-info">
                            <h2>{product.title}</h2>
                            <span className="product-category">{product.category?.name}</span>
                        </div>

                        <div className="product-price">
                            {new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                            }).format(product.price)}
                        </div>

                        <div className="product-description">
                            <h3>Descrição</h3>
                            <p>{product.description}</p>
                        </div>

                        <div className="product-content-info">
                            <h3>Conteúdo</h3>
                            <p>{product.content}</p>
                        </div>

                        <div className="product-actions">
                            <button onClick={handleAddToCart} className="add-to-cart-button">
                                <ShoppingBag size={20} />
                                Adicionar ao Carrinho
                            </button>
                            <button onClick={handleBuyNow} className="buy-now-button">
                                Comprar Agora
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default ConsumeProduct;
