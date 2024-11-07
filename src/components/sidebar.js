import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.js';
import './sidebar.styles.css';
import { Logo } from './logo.js';

export function Sidebar() {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    return (
        <aside className="sidebar">
            <Logo />
            <nav className="sidebar__menu">
                <ul>
                    <li onClick={() => navigate('/available-products')}>Produtos disponiveis</li>
                    <li onClick={() => navigate('/bought-products')}>Produtos Compados</li>
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
