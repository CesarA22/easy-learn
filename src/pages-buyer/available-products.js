import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../styles-buyer/available-products.css";
import { AuthContext } from "../context/AuthContext.js";
import { Sidebar } from "../components/sidebar.js";
import { Product } from "../components/product-card.js";

function AvailableProducts() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // TODO: tirar depois
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

  const price = ["sem ordem", "menor preco", "maior preco"];

  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [priceOrder, setPriceOrder] = useState("sem ordem");

  const orderedProducts = products
    .filter(
      (product) =>
        selectedCategory === "todos" ||
        product.categories.includes(selectedCategory)
    )
    .sort((a, b) => {
      if (priceOrder === "menor preco") {
        return a.price - b.price;
      } else if (priceOrder === "maior preco") {
        return b.price - a.price;
      }
      return 0;
    });

  // TODO: implementar fetch da API
  /* useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }
    console.log(token);
    if (!user) return;

    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/products/item`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("Fetched products:", data);
        setProducts(data);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    fetchProducts();
  }, [user]); */

  return (
    <div className="produtos-disponiveis">
      <Sidebar />
      <main className="produtos-disponiveis__container">
        <header>
          <h1 className="produtos-disponiveis__welcome">
            Boas-vindas, {user ? user.name : "Nome do perfil"}
          </h1>
        </header>
        <section className="produtos-disponiveis__header">
          <div className="produtos-disponiveis__header__text">
            <h2>Conteúdos comprados:</h2>
            <span>(total {products.length})</span>
          </div>
          <div className="produtos-disponiveis__header__filters">
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
            <div className="select-container">
              <label htmlFor="category-select">Preco:</label>
              <select
                id="category-select"
                value={priceOrder}
                onChange={(e) => setPriceOrder(e.target.value)}
                className="select-input"
              >
                {price.map((price) => (
                  <option value={price}>{price}</option>
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

export default AvailableProducts;
