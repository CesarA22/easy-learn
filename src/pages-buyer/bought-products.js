import React, { useState, useContext } from "react";
import "../styles-buyer/bought-products.css";
import { AuthContext } from "../context/AuthContext.js";
import { Sidebar } from "../components/sidebar.js";
import { Product } from "../components/product-card.js";

function BoughtProducts() {
  const { user } = useContext(AuthContext);
  const [selectedCategory, setSelectedCategory] = useState("todos");

  const mockedProducts = [
    {
      id: 1,
      name: "prod-1",
      categories: ["software", "curso", "ebook"],
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      url: "/",
      price: 11,
    },
    {
      id: 2,
      name: "prod-2",
      categories: ["curso", "guia", "treinamento"],
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      url: "/",
      price: 12,
    },
    {
      id: 3,
      name: "prod-3",
      categories: ["design", "modelo", "curso"],
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      url: "/",
      price: 13,
    },
    {
      id: 4,
      name: "prod-4",
      categories: ["software", "template", "ebook"],
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      url: "/",
      price: 14,
    },
    {
      id: 5,
      name: "prod-5",
      categories: ["aplicativo", "script", "ebook"],
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      url: "/",
      price: 15,
    },
  ];

  // TODO: tirar o mockedProducts e deixar uma array vazia
  const [products, setProducts] = useState([...mockedProducts]);

  // TODO: implementar fetch da API
  //       setProducts(retorno_da_api)

  // TODO: mudar as categorias de acordo com o projeto
  // select filter hard-coded
  const categories = [
    "todos",
    "software",
    "curso",
    "ebook",
    "guia",
    "treinamento",
    "design",
    "modelo",
    "template",
    "aplicativo",
    "script",
  ];

  const orderedProducts = products.filter((product) =>
    selectedCategory === "todos"
      ? products
      : product.categories.includes(selectedCategory)
  );

  return (
    <div className="produtos-comprados">
      <Sidebar />
      <main className="produtos-comprados__container">
        <header>
          <h1 className="produtos-comprados__welcome">
            Boas-vindas, {user ? user.name : "Nome do perfil"}
          </h1>
        </header>

        <section className="produtos-comprados__header">
          <div className="produtos-comprados__header__text">
            <h2>Conteúdos comprados:</h2>
            <span>(total {products.length})</span>
          </div>
          <div className="produtos-comprados__header__filters">
            <div className="select-container">
              <label htmlFor="category-select">Categoria:</label>
              <select
                id="category-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="select-input"
              >
                {categories.map((category) => (
                  <option value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </section>
        <div className="produtos-comprados__list">
          {orderedProducts.length > 0 ? (
            orderedProducts.map((product, index) => (
              <Product key={index} product={product} />
            ))
          ) : (
            <p>Nenhum produto encontrado.</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default BoughtProducts;
