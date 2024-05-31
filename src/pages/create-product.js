import React from "react";
import "../styles/create-product.css";

const CreateProduct = () => {
  return (
    <div className="product-form-container">
      <aside className="sidebar">
        <div className="logo">Easy Learn</div>
        <nav className="menu">
          <ul>
            <li>Dashboard</li>
            <li>Vendas</li>
            <li>Produtos</li>
            <li>Finanças</li>
          </ul>
        </nav>
        <div className="settings">
          <p>Configurações</p>
          <p>Carlos Eduardo</p>
        </div>
      </aside>
      <main className="create-product__main-content">
        <header>
          <h1>Cadastrar Produto</h1>
        </header>
        <div class="product-form__wrapper">
          <div className="product-form dashboard__main-content__col--1">
            <div className="product-details">
              <div className="form-group">
                <label htmlFor="productTitle">Título do produto:</label>
                <input
                  type="text"
                  id="productTitle"
                  placeholder="Adicione um título"
                />
              </div>
              <div className="form-group">
                <label htmlFor="productCategory">Categoria do produto:</label>
                <input
                  type="text"
                  id="productCategory"
                  placeholder="Adicione uma categoria"
                />
              </div>
              <div className="form-group">
                <label htmlFor="productDescription">
                  Descrição do produto:
                </label>
                <textarea
                  id="productDescription"
                  placeholder="Adicione uma descrição para o produto"
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="productPrice">Preço do produto:</label>
                <input
                  type="number"
                  id="productPrice"
                  placeholder="Adicione um preço para o produto"
                />
              </div>
            </div>
          </div>
          <div class="dashboard__main-content__col--2">
            <div className="product-upload">
              <p>Seu produto:</p>
              <div className="upload-box">
                <button className="upload-button">+</button>
                <p>Faça o upload de seu produto/arquivo</p>
              </div>
            </div>
          </div>
        </div>
        <div className="product-content form-group">
          <p>Conteúdo do produto:</p>
          <textarea placeholder="Adicione o conteúdo do produto"></textarea>
        </div>
      </main>
    </div>
  );
};

export default CreateProduct;
