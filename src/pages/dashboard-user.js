import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/dashboard-user.css';

function DashboardUser() {
  const history = useNavigate();

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="logo" onClick={() => history.push('/login')}>Easy Learn</div>
        <nav className="menu">
          <ul>
            <li onClick={() => history.push('/dashboard-user')}>Dashboard</li>
            <li>Vendas</li>
            <li>Produtos</li>
            <li>Finanças</li>
          </ul>
        </nav>
        <div className="settings">
          <p>Configurações</p>
          <p onClick={() => history.push('/user-screen')}>Carlos Eduardo</p>
          <li onClick={() => history.push('/products')}>Produtos</li>
        </div>
      </aside>
      <main className="main-content">
        <header>
          <h1>Boas-vindas, Carlos</h1>
        </header>
        <section className="summary">
          <div className="summary-item">Vendas hoje <span>R$ 0.00</span></div>
          <div className="summary-item">Saldo disponível <span>R$ 0.00</span></div>
          <div className="summary-item">Pendente <span>R$ 0.00</span></div>
          <div className="summary-item">Nível 1</div>
        </section>
        <section className="chart">
          <h2>Gráfico de Faturamento</h2>
          <div className="chart-content"></div>
        </section>
        <section className="details">
          <div className="detail-item">COMISSÃO DE PAGAMENTO</div>
          <div className="detail-item">STATUS DA CONTA</div>
          <div className="detail-item">CONVERSÃO DE CHECKOUT</div>
        </section>
        <section className="products">
          <h2>Produtos:</h2>
          <div className="product-item">Exemplo-1</div>
          <div className="product-item">Exemplo-2</div>
        </section>
        <section className="finances">
          <h2>Finanças:</h2>
          <div className="finance-item">Saldo disponível <span>R$ 0.00</span></div>
          <div className="finance-item">Pendente <span>R$ 0.00</span></div>
          <div className="finance-item">Reservado <span>R$ 0.00</span></div>
          <div className="finance-item">Total <span>R$ 0.00</span></div>
        </section>
        <section className="withdraw">
          <h2>Solicite um saque</h2>
          <div className="withdraw-form">
            <input type="number" placeholder="Valor" />
            <button>Solicitar saque</button>
          </div>
        </section>
        <section className="extract">
          <h2>Extrato:</h2>
        </section>
      </main>
    </div>
  );
}

export default DashboardUser;
