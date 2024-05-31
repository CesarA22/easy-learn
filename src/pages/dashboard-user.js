// src/components/DashboardUser.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/dashboard-user.css';

function DashboardUser() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
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
          <p onClick={() => navigate('/user-screen')}>Pimegonho Bizo...</p>
        </div>
      </aside>
      <main className="dashboard__main-content">
        <header>
          <h1>Boas-vindas, Pimegonho</h1>
        </header>
        
        <section className="summary">
          <div className="summary-item">
            <p>Vendas hoje</p>
            <span>R$ 0.00</span>
          </div>
          <div className="summary-item">
            <p>Saldo disponível</p>
            <span>R$ 0.00</span>
          </div>
          <div className="summary-item">
            <p>Pendente</p>
            <span>R$ 0.00</span>
          </div>
          <div className="summary-item">
            <p>Nível 1</p>
          </div>
        </section>
        <section className="chart">
          <h2>Gráfico de Faturamento</h2>
          <div className="chart-content"></div>
        </section>
        <section className="finances">
          <h2>Finanças</h2>
          <div className="finance-summary">
            <div className="finance-item">
              <p>Saldo disponível</p>
              <span>R$ 0.00</span>
            </div>
            <div className="finance-item">
              <p>Pendente</p>
              <span>R$ 0.00</span>
            </div>
            <div className="finance-item">
              <p>Reservado</p>
              <span>R$ 0.00</span>
            </div>
            <div className="finance-item">
              <p>Total</p>
              <span>R$ 0.00</span>
            </div>
          </div>
          <div className="withdraw">
            <h2>Solicite um saque</h2>
            <div className="withdraw-form">
              <input type="number" placeholder="Valor" />
              <button>Solicitar saque</button>
            </div>
          </div>
          <div className="extract">
            <h2>Extrato</h2>
            <div className="extract-content"></div>
          </div>
        </section>

      </main>
    </div>
  );
}

export default DashboardUser;
