import React from 'react';
import { X, Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext.js';
import { useNavigate } from 'react-router-dom';
import './sliding-cart.styles.css';

export const SlidingCart = () => {
    const { isCartOpen, setIsCartOpen, cartItems, removeFromCart, updateQuantity, getTotal } =
        useCart();
    const navigate = useNavigate();

    const handleCheckout = () => {
        navigate('/purchase-confirmation');
        setIsCartOpen(false);
    };

    return (
        <>
            {isCartOpen && <div className="cart-overlay" onClick={() => setIsCartOpen(false)} />}

            <div className={`sliding-cart ${isCartOpen ? 'open' : ''}`}>
                <div className="cart-container">
                    <div className="cart-header">
                        <div className="cart-title">
                            <ShoppingCart size={24} />
                            <h2>Carrinho</h2>
                        </div>
                        <button onClick={() => setIsCartOpen(false)} className="close-button">
                            <X size={20} />
                        </button>
                    </div>

                    <div className="cart-items">
                        {cartItems.length === 0 ? (
                            <div className="empty-cart">Seu carrinho está vazio</div>
                        ) : (
                            <div className="items-container">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="cart-item">
                                        <div className="item-image">
                                            {item.image && (
                                                <img
                                                    src={`${process.env.REACT_APP_BACKEND_URL}/images/${item.image}`}
                                                    alt={item.title}
                                                />
                                            )}
                                        </div>
                                        <div className="item-details">
                                            <h3>{item.title}</h3>
                                            <p className="item-price">R$ {item.price.toFixed(2)}</p>
                                            <div className="item-actions">
                                                <div className="quantity-controls">
                                                    <button
                                                        onClick={() =>
                                                            updateQuantity(
                                                                item.id,
                                                                item.quantity - 1,
                                                            )
                                                        }
                                                    >
                                                        <Minus size={16} />
                                                    </button>
                                                    <span>{item.quantity}</span>
                                                    <button
                                                        onClick={() =>
                                                            updateQuantity(
                                                                item.id,
                                                                item.quantity + 1,
                                                            )
                                                        }
                                                    >
                                                        <Plus size={16} />
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="remove-button"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="cart-footer">
                        <div className="cart-total">
                            <span>Total:</span>
                            <span>R$ {getTotal().toFixed(2)}</span>
                        </div>
                        <button
                            onClick={handleCheckout}
                            disabled={cartItems.length === 0}
                            className="checkout-button"
                        >
                            Finalizar Compra
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
