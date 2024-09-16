import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/user-screen.css';
import { AuthContext } from '../context/AuthContext';

function UserScreenComprador() {
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
    navigate('/login-comprador');
  };

  return (
    <div className="user-screen-container">
      <aside className="sidebar">
        <div className="logo" onClick={() => navigate('/login-comprador')}>Easy Learn</div>
        <nav className="menu">
          <ul>
            <li onClick={() => navigate('/produtos-disponiveis')}>Produtos disponiveis</li>
            <li onClick={() => navigate('/products-comprados')}>Produtos Compados</li>
          </ul>
        </nav>
        <div className="settings">
          <p>Configurações</p>
          <p onClick={() => navigate('/user-screen-comprador')}>{user ? user.name : 'Nome do perfil'}</p>
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
              <p><strong>Email:</strong> {user ? user.email : 'email@dominio.com'}</p>
              <p><strong>Idioma:</strong> Português</p>
              <p><strong>Verificação:</strong> <span className="verified">Dados Verificados</span></p>
            </div>
          </div>
          <button className="edit-button">Editar</button>
        </section>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </main>
    </div>
  );
}

export default UserScreenComprador;
