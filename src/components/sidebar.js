import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.js';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext.js';
import { Logo } from './logo.js';
import './sidebar.styles.css';

export function Sidebar() {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const { cartItems, setIsCartOpen } = useCart();

    return (
        <aside className="sidebar">
            <Logo />
            <nav className="sidebar__menu">
                <ul>
                    <li onClick={() => navigate('/available-products')}>Produtos disponiveis</li>
                    <li onClick={() => navigate('/bought-products')}>Produtos Comprados</li>
                    <li onClick={() => setIsCartOpen(true)} className="cart-item">
                        <div className="cart-item-content">
                            <ShoppingCart size={20} />
                            <span>Carrinho</span>
                            {cartItems.length > 0 && (
                                <span className="cart-badge">{cartItems.length}</span>
                            )}
                        </div>
                    </li>
                </ul>
            </nav>
            <div className="sidebar__settings">
                <p>Configurações</p>
                <p onClick={() => navigate('/user-screen-buyer')}>
                    {user ? user.name : 'Nome do perfil'}
                </p>
            </div>
        </aside>
    );
}
