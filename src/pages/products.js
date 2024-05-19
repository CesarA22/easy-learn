import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/products.css';

function Products() {
  const history = useNavigate();

  return (
    <div className="products-container">
      <aside className="sidebar">
        <div className="logo" onClick={() => history.push('/login')}>Easy Learn</div>
        <nav className="menu">
          <ul>
            <li onClick={() => history.push('/dashboard-user')}>Dashboard</li>
            <li onClick={() => history.push('/products')}>Produtos</li>
            <li>Vendas</li>
            <li>Finanças</li>
          </ul>
        </nav>
        <div className="settings">
          <p>Configurações</p>
          <p onClick={() => history.push('/user-screen')}>Nome do perfil</p>
        </div>
      </aside>
      <main className="main-content">
        <header>
          <h1>Bem-vindo, nome do perfil</h1>
          <h2>Aqui estão os seus produtos</h2>
        </header>
        <section className="product-list">
          <div className="product-item">
            <div className="product-image">
              <img src="path/to/placeholder-image.jpg" alt="Product" />
            </div>
            <div className="product-details">
              <h3>Nome do produto</h3>
              <p>Descrição do produto</p>
            </div>
          </div>
          <div className="product-item">
            <div className="product-image">
              <img src="path/to/placeholder-image.jpg" alt="Product" />
            </div>
            <div className="product-details">
              <h3>Nome do produto</h3>
              <p>Descrição do produto</p>
            </div>
          </div>
          <div className="product-item">
            <div className="product-image">
              <img src="path/to/placeholder-image.jpg" alt="Product" />
            </div>
            <div className="product-details">
              <h3>Nome do produto</h3>
              <p>Descrição do produto</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Products;
