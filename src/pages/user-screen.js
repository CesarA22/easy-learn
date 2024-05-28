// src/components/UserScreen.js
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/user-screen.css';
import { AuthContext } from '../context/AuthContext';

function UserScreen() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    setUser(null); // Limpar o contexto de autenticação
    navigate('/login'); // Redirecionar para a página de login
  };

  return (
    <div className="user-screen-container">
      <aside className="sidebar">
        <div className="logo" onClick={() => navigate('/login')}>Easy Learn</div>
        <nav className="menu">
          <ul>
            <li onClick={() => navigate('/dashboard-user')}>Dashboard</li>
            <li onClick={() => navigate('/products')}>Produtos</li>
            <li>Vendas</li>
            <li>Finanças</li>
          </ul>
        </nav>
        <div className="settings">
          <p>Configurações</p>
          <p onClick={() => navigate('/user-screen')}>{user ? user.name : 'Nome do perfil'}</p>
        </div>
      </aside>
      <main className="main-content">
        <header>
          <h1>Perfil do Usuário</h1>
        </header>
        <section className="profile">
          <h2>Perfil</h2>
          <div className="profile-content">
            <div className="profile-picture">
              <div className="picture">{user ? user.name[0] : 'N'}</div>
              <div className="edit-icon">+</div>
            </div>
            <div className="profile-details">
              <p><strong>Nome:</strong> {user ? user.name : 'Nome do perfil'}</p>
              <p><strong>Email:</strong> {user ? user.email : 'email@dominio.com'}</p>
            </div>
          </div>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </section>
      </main>
    </div>
  );
}

export default UserScreen;
