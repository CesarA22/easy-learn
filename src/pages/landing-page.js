import React from 'react';
import '../styles/landing-page.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header className="header">
        <h1>Easy Learn</h1>
        <nav>
          <button className="button" onClick={() => window.location.href = '/create-account'}>Criar Conta</button>
          <button className="button" onClick={() => window.location.href = '/signup'}>Cadastrar-se</button>
        </nav>
      </header>
      <section className="main-content">
        <div className="promo-section">
          <h2>Bem-vindo ao Easy Learn</h2>
          <p>A melhor plataforma para aprender e crescer profissionalmente.</p>
        </div>
        <div className="image-section">
          <img src="xxxxxxxxxxxxx" alt="Promoção de cursos" />
        </div>
      </section>
      <section className="ads-section">
        <h3>Exemplo para algum anúncio</h3>
        <div className="ad">Espaço pra qualquer bosta 1</div>
        <div className="ad">Espaço pra qualquer merda 2</div>
        <div className="ad">Espaço pra qualquer caralho 3</div>
      </section>
    </div>
  );
};

export default LandingPage;
