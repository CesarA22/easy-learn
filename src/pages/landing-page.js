import React from 'react';
import headerImg from '../assets/header-img.png'
import logo from '../assets/logo.png'
import sellImg from '../assets/sell.png'
import businessImg from '../assets/business.png'
import '../styles/landing-page.css';
import { Link } from 'react-router-dom';
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { MdPhotoCamera } from "react-icons/md";



const LandingPage = () => {
  return (
    <div className='lp'>
      <Navbar />
      <Header />
      <Guides />
      <Sell />
      <Business />
      <Contact />
    </div>
  )
}

export default LandingPage;

export const Navbar = () => {
  return (
    <nav className='lp__container lp__navbar'>
      <div class="lp__navbar__container">
        <div className='lp__logo'>
          <img src={logo} alt='logo'/>
          Easy Learn
          </div>
        <ul className='lp__navbar__items'>
          <li><a>Inicio</a></li>
          <li><a>Funcionalidade</a></li>
          <li><a>Ajuda</a></li>
        </ul>
        <div className='lp__btns'>
          <Link to="login" className='lp__btn--secondary'>Login</Link>
          <Link to="create-account" className='btn--primary'>Cadastre-se agora</Link>
        </div>
      </div>
    </nav>
  )
}

export const Header = () => {
  return (
    <header className='lp__container lp__header'>
      <div class="lp__header__container">
        <div className='lp__header__col--1'>
          <h1 className='lp__title'>Simples,confiável, lucrativa,para pessoas ambiciosas</h1>
          <p>Crie produtos e serviços digitais como e-books, cursos online,mentorias — e venda com a menor taxa do mercado.</p>
          <Link to="create-account" className='btn--primary'>Cadastre-se agora</Link>
        </div>
        <div className='lp__header__col--2'>
          <img src={headerImg}  alt="header-img" />
        </div>
      </div>
    </header>
  )
}

export const Guides = () => {
  return (
    <section className='lp__guides'>
      <div className='lp__container'>
        <div className='lp__guides__container'>
          <div className='lp__guides__col--1'>
            <ul className='lp__guides__box'>
              <li className='lp__guides__box__item'>
                <RiVerifiedBadgeFill color='#387FF9'/>
                <div>Crie sua conta</div>
              </li>
              <li className='lp__guides__box__item'>
                <RiVerifiedBadgeFill color='#387FF9'/>
                <div>Cadastre seu produto</div>
              </li>
              <li className='lp__guides__box__item'>
                <RiVerifiedBadgeFill color='#387FF9'/>
                <div>Comece a vender</div>
              </li>
            </ul>
          </div>
          <div className='lp__guides__col--2'>
            <h2>Sua primeira venda no digital mais rápida do que você imagina</h2>
            <div>
              <h3>Cadastro de conta:</h3>
              <p>Clique no botão "Cadastre-se". Insira as informações solicitadas e siga o fluxo de boas-vindas.</p>
              <h3>Confirmação de e-mail:</h3>
              <p>Acesse sua caixa de entrada e clique no link de confirmação para validar seu cadastro.</p>
              <h3>Informações complementares:</h3>
              <p>Complete seu perfil adicionando informações complementares.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export const Sell = () => {
  return (
    <section className='lp__sell'>
      <div className='lp__container'>
        <div className='lp__sell__container'>
          <div className='lp__sell__col--1'>
            <h2>Criou algo fantástico? Te ajudamos a vender.</h2>
            <div className='lp__sell__box__container'>
              <SellItem title={"Fotografia"} icon={<MdPhotoCamera size={20} />} />
              <SellItem title={"Aulas"} icon={<MdPhotoCamera size={20} />} />
              <SellItem title={"E-Books"} icon={<MdPhotoCamera size={20} />} />
              <SellItem title={"Consultas"} icon={<MdPhotoCamera size={20} />} />
              <SellItem title={"Mentorias"} icon={<MdPhotoCamera size={20} />} />
              <SellItem title={"Comunidade"} icon={<MdPhotoCamera size={20} />} />
              <SellItem title={"Newsletter"} icon={<MdPhotoCamera size={20} />} />
              <SellItem title={"Cursos Online"} icon={<MdPhotoCamera size={20} />} />
              <SellItem title={"Assessoria"} icon={<MdPhotoCamera size={20} />} />
              <SellItem title={"Freelance"} icon={<MdPhotoCamera size={20} />} />
              <SellItem title={"Vídeos"} icon={<MdPhotoCamera size={20} />} />
            </div>
          </div>
          <div className='lp__sell__col--2'>
            <img src={sellImg} />
          </div>
        </div>
      </div>
    </section>
  )
}

export const SellItem = (props) => {
  return (
    <div className='lp__sell__box'>
      <div className='lp__sell__box__item'>
        {props.icon}
      </div>
      <div>{props.title}</div>
    </div>
  )
}

export const Business = () => {
  return (
    <section className='lp__business'>
      <div className='lp__container'>
        <div className='lp__business__container'>
          <div className='lp__business__text'>
            <h2>Monte seu negócio digital sem um produto próprio</h2>
            <p>Promova produtos de terceiros através de links de afiliaçãoe receba uma comissão por cada venda realizada.</p>
          </div>
          <img src={businessImg} />
        </div>
      </div>
    </section>
  )
}

export const Contact = () => {
  return (
    <div className='lp__contact'>
      <div className='lp__container'>
        <div className='lp__contact__container'>
          <div className='lp__contact__col--1'>
            <h2>Recuperador de vendas nativo</h2>
            <p>Evite que seu cliente esqueça de pagar em dia, nosso recuperador envia mensagens relevantes para os seus clientes, o que aumenta as chances de conversão.</p>
          </div>
          <div className='lp__contact__col--2'>
            <ContactCard title="Cobrança criada para Tulio Caldas" date="22/11/2023 11:55" />
            <ContactCard title="Mensagem enviada" date="25/11/2023 19:12" />
            <ContactCard title="Mensagem visualizada" date="25/11/2023 19:13" />
            <ContactCard title="Pagamento aprovado" date="25/11/2023 19:15" />
          </div>
        </div>
      </div>
    </div>
  )
}

export const ContactCard = (props) => {
  return (
    <div className='lp__contact-card'>
      <div className='lp__contact-card__box'>
        <RiVerifiedBadgeFill color='#387FF9'/>
      </div>
      <div className='lp__contact-card__text'>
        <div>{props.title}</div>
        <div>{props.date}</div>
      </div>
    </div>
  )
}
