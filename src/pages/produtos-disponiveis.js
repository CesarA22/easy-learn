import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/produtos-disponiveis.css";
import { AuthContext } from "../context/AuthContext.js";

function ProdutosDisponiveis() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {

    const token = localStorage.getItem('token');
    if (!token) {
        console.error("No token found");
        return;
      }
    console.log(token)
    if (!user) return; // Ensure user is authenticated before making the request

    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3001/products/item", {
            method: "GET",
          headers: {
            Authorization: `Bearer ${user.token}`, // Assuming the user object has a token property
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("Fetched products:", data); // Log the fetched data
        setProducts(data); // Assuming the data is an array of products
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    fetchProducts();
  }, [user]);

  return (
    <div className="produtos-disponiveis-container">
      <aside className="sidebar">
        <div className="logo" onClick={() => navigate("/")}>
          Easy Learn
        </div>
        <nav className="menu">
          <ul>
            <li onClick={() => navigate("/produtos-disponiveis")}>
              Produtos disponíveis
            </li>
            <li onClick={() => navigate("/produtos-comprados")}>
              Produtos Comprados
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
            {products.length === 0 ? (
                <p>Nenhum produto disponível</p> // Show a message if there are no products
            ) : (
                products.map((product) => (
                <section className="product" key={product.id}>
                    <h2>{product.name}</h2>
                    <div className="product-content">
                    <div className="product-item">
                        <div className="product-image" />
                        <div>
                        <p>{product.name}</p>
                        <p>{product.description}</p>
                        </div>
                    </div>
                    </div>
                </section>
                ))
            )}
            </div>
      </main>
    </div>
  );
}

export default ProdutosDisponiveis;
