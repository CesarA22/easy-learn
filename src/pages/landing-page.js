import React from 'react';
import '../styles/landing-page.css';

const LandingPage = () => {
  return (
    <div className="container">
      <header className="header">
        <h1 className="logo">Easy Learn</h1>
        <nav>
          <button className="button">Login</button>
          <button className="button">Cadastre-se</button>
        </nav>
      </header>
      <div className="main-content">
        <div className="left-section">
          <h2>Descubra uma nova forma de aprender!</h2>
          <p>Easy Learn oferece uma vasta seleção de cursos online para impulsionar sua carreira.</p>
          <ul className="features">
            <li>Cursos de alta qualidade</li>
            <li>Professores experientes</li>
            <li>Aprenda no seu próprio ritmo</li>
          </ul>
          <div className="testimonials">
            <h3>Depoimentos</h3>
            <div className="testimonial">
              <p>"Exemplo1 - Easy Learn me ajudou a alcançar meus objetivos de aprendizado de forma rápida e eficaz!"</p>
            </div>
            <div className="testimonial">
              <p>"Exemplo2 - Excelente plataforma com conteúdo atualizado e instrutores muito qualificados."</p>
            </div>
          </div>
        </div>
        <div className="right-section">
          <img src="-imagem-" alt="Illustration" />
        </div>
      </div>
      <div className="courses">
        <h2>Cursos em Destaque</h2>
        <div className="course">
          <h3>Curso de Desenvolvimento Web</h3>
          <p>Aprenda HTML, CSS, JavaScript e muito mais para criar sites incríveis!</p>
        </div>
        <div className="course">
          <h3>Curso de Marketing Digital</h3>
          <p>Domine as estratégias de marketing online e impulsione seus negócios na internet.</p>
        </div>
      </div>
      <form className="contact-form">
        <h2>Entre em Contato</h2>
        <label htmlFor="name">Nome:</label>
        <input type="text" id="name" name="name" />
        <label htmlFor="email">E-mail:</label>
        <input type="email" id="email" name="email" />
        <label htmlFor="message">Mensagem:</label>
        <textarea id="message" name="message" rows="5"></textarea>
        <button type="submit" className="button">Enviar Mensagem</button>
      </form>
      <footer className="footer">
        &copy; 2024 Easy Learn. Todos os direitos reservados.
      </footer>
    </div>
  );
}

export default LandingPage;
