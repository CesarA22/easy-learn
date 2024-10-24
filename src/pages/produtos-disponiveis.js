// src/components/ProdutosDisponiveis.js
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/produtos-disponiveis.css";
import { AuthContext } from "../context/AuthContext";

function ProdutosDisponiveis() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [products, setProducts] = useState([
    { name: "prod-1", description: "Descrição do produto" },
    { name: "prod-2", description: "Descrição do produto" },
    { name: "prod-3", description: "Descrição do produto" },
    { name: "prod-4", description: "Descrição do produto" },
    { name: "prod-5", description: "Descrição do produto" },
  ]);

  // useEffect(() => {
  // TODO: Fazer uma chamada para API
  // e setar os produtos com setProducts
  // setProducts()
  // }, [])

  return (
    <div className="produtos-disponiveis-container">
      <aside className="sidebar">
        <div className="logo" onClick={() => navigate("/")}>
          Easy Learn
        </div>
        <nav className="menu">
          <ul>
            <li onClick={() => navigate("/produtos-disponiveis")}>
              Produtos disponiveis
            </li>
            <li onClick={() => navigate("/products-comprados")}>
              Produtos Compados
            </li>
          </ul>
        </nav>
        <div className="settings">
          <p>Configurações</p>
          <p onClick={() => navigate("/user-screen-comprador")}>
            {user ? user.name : "Nome do perfil"}
          </p>
        </div>
      </aside>
      <main className="main-content">
        <header>
          <h1>Boas-vindas, {user ? user.name : "Nome do perfil"}</h1>
        </header>

        <section className="summary">
          <div className="summary-item">
            <p>Conteúdos comprados:</p>
          </div>
          <div className="summary-item">
            <p>Selecione uma categoria</p>
            <span>Exemplo1</span>
          </div>
          <div className="summary-item">
            <p>Selecione um preço</p>
            <span>R$ 0.00 - R$ 10.00</span>
          </div>
        </section>
        <div className="products__container">
          {products.map((product) => (
            <section className="product">
              <h2>Produto exemplo 1</h2>
              <div className="product-content">
                <div className="product-item" key={product.name}>
                  <div className="product-image" />
                  <div>
                    <p>{product.name}</p>
                    <p>{product.description}</p>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}

export default ProdutosDisponiveis;
