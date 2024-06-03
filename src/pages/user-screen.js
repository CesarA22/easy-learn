import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/user-screen.css';
import { AuthContext } from '../context/AuthContext';

function UserScreen() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch('http://localhost:3000/user/me', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          if (response.ok) {
            setUser(data.user);
          } else {
            console.error('Failed to fetch user data:', data.error);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, [setUser]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
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
              <p><strong>Documento:</strong> 345. 123.123-40 </p>
              <p><strong>Telefone:</strong> (19)988776655 </p>
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
