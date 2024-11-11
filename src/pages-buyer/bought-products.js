import React, { useState, useEffect, useContext } from "react";
import "../styles-buyer/bought-products.css";
import { AuthContext } from "../context/AuthContext.js";
import { Sidebar } from "../components/sidebar.js";
import { Product } from "../components/product-card.js";
import productService from "../services/productService";

function BoughtProducts() {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [categories, setCategories] = useState(["todos"]);

  useEffect(() => {
    const fetchBoughtProducts = async () => {
      if (!user?.id) return;
      
      try {
        const boughtProducts = await productService.getBoughtProducts(user.id);
        setProducts(boughtProducts);
        
        // Extrair categorias únicas dos produtos comprados
        const uniqueCategories = new Set(boughtProducts.flatMap(product => product.categories));
        setCategories(["todos", ...uniqueCategories]);
      } catch (err) {
        setError("Erro ao carregar produtos comprados");
      } finally {
        setLoading(false);
      }
    };

    fetchBoughtProducts();
  }, [user]);

  const filteredProducts = products.filter((product) =>
    selectedCategory === "todos"
      ? true
      : product.categories.includes(selectedCategory)
  );

  if (loading) {
    return (
      <div className="produtos-comprados">
        <Sidebar />
        <main className="produtos-comprados__container">
          <p>Carregando produtos...</p>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="produtos-comprados">
        <Sidebar />
        <main className="produtos-comprados__container">
          <p className="error-message">{error}</p>
        </main>
      </div>
    );
  }

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
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </section>
        <div className="produtos-comprados__list">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Product key={product.id} product={product} />
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