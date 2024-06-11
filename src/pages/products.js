// products.js do front-end
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/products.css';
import { AuthContext } from '../context/AuthContext';

function Products() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [hasProducts, setHasProducts] = useState(true);

  useEffect(() => {
    const fetchUserProducts = async () => {
      if (user) {
        try {
          const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/${user._id}/products`);
          const data = await response.json();

          setHasProducts(data.hasProducts);
          setProducts(data.products);
        } catch (error) {
          console.error('Erro ao buscar produtos do usuário:', error);
        }
      }
    };

    fetchUserProducts();
  }, [user]);

  const handleProductClick = (id) => {
    navigate(`/products/${id}`);
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
          <h1>Bem-vindo, {user ? user.name.split(' ')[0] : 'Usuário'}</h1>
          <h2>Aqui estão os seus produtos</h2>
        </header>
        <section className="profile-actions">
          <button onClick={() => navigate('/create-product')} className="edit-button">Adicionar Produto</button>
        </section>
        <section className="products-section">
          {hasProducts ? (
            <div className="product-grid">
              {products.map((product) => (
                <div key={product._id} className="product-card"onClick={() => handleProductClick(product._id)}>
                  <div className="product-image">
                    <img src={`${process.env.REACT_APP_BACKEND_URL}/public/files/${product.images[0]?.url}`} alt="Product" />
                  </div>
                  <div className="product-info">
                    <h3>{product.title}</h3>
                    <p>{product.description}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-products">
              <p>Você ainda não tem nenhum produto cadastrado.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Products;
