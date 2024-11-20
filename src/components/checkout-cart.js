import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './checkout-cart.styles.css';

export const CheckoutCart = () => {
    const { cartItems, removeFromCart, updateQuantity, getTotal } = useCart();

    if (cartItems.length === 0) return null;

    return (
        <div className="checkout-cart">
            <div className="checkout-cart-container">
                <div className="checkout-cart-header">
                    <h2>Resumo do Pedido</h2>
                    <span>({cartItems.length} {cartItems.length === 1 ? 'item' : 'itens'})</span>
                </div>

                <div className="checkout-cart-items">
                    {cartItems.map((item) => (
                        <div key={item.id} className="checkout-cart-item">
                            <div className="checkout-item-image">
                                {item.image && (
                                    <img
                                        src={`${process.env.REACT_APP_BACKEND_URL}/images/${item.image}`}
                                        alt={item.title}
                                    />
                                )}
                            </div>
                            <div className="checkout-item-details">
                                <h3>{item.title}</h3>
                                <p className="checkout-item-price">
                                    R$ {item.price.toFixed(2)}
                                </p>
                                <div className="checkout-item-actions">
                                    <div className="checkout-quantity-controls">
                                        <button
                                            onClick={() =>
                                                updateQuantity(item.id, item.quantity - 1)
                                            }
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button
                                            onClick={() =>
                                                updateQuantity(item.id, item.quantity + 1)
                                            }
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="checkout-remove-button"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="checkout-cart-footer">
                    <div className="checkout-cart-total">
                        <span>Total:</span>
                        <span className="total-price">R$ {getTotal().toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};