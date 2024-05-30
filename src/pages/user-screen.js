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
          <h1>Configurações</h1>
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
              <p><strong>Documento:</strong> 000.000.000-00</p>
              <p><strong>Telefone:</strong> +55 11 00000-0000</p>
              <p><strong>Email:</strong> {user ? user.email : 'email@dominio.com'}</p>
              <p><strong>Idioma:</strong> Português</p>
              <p><strong>Verificação:</strong> <span className="verified">Dados Verificados</span></p>
            </div>
          </div>
          <button className="edit-button">Editar</button>
        </section>
        <section className="business">
          <h2>Negócios</h2>
          <div className="business-content">
            <div className="business-item">
              <p><strong>Exemplo-1</strong></p>
              <p>Descrição do exemplo...</p>
            </div>
            <button className="new-business-button">+ Novo Negócio</button>
          </div>
        </section>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </main>
    </div>
  );
}

export default UserScreen;
