import { Sidebar } from "../components/sidebar.js";
import { useNavigate } from "react-router-dom";

function ConsumeProduct() {
  const navigate = useNavigate();
  return (
    <div className="consume-product">
      <Sidebar />
      <main className="consume-product__container">
        <header>
          <h1 className="consume-product__header">
            <button onClick={() => navigate("/available-products")}>
              Return
            </button>
            Produto disponivel:
          </h1>
        </header>
        <section className="product-content">
          <div className="product-content__img" />
          <div className="product-content__header">
            <h2>Curso Pimegonho 2.0</h2>
            <button>Comprar</button>
          </div>
          <div className="product-content__info">
            <h3>Preco:</h3>
            <div className="product-content__price">
              <p>R$</p>
              <div>100,00</div>
            </div>
          </div>

          <div className="product-content__info">
            <h3>Categorias:</h3>
            <div className="product-content__categories">
              {["curso", "educacao", "financa"].map((category) => (
                <div>{category}</div>
              ))}
            </div>
          </div>

          <div className="product-content__info">
            <h3>Descricao do produto:</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
              eget purus nec ligula feugiat ultricies. Duis ultricies, purus ac
              luctus suscipit, nisl nisl molestie nisl, ac luctus nisl molestie
              nisl. Praesent eget purus nec ligula feugiat ultricies.
            </p>
          </div>
          <div className="product-content__info">
            <h3>Conteúdo do produto:</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
              eget purus nec ligula feugiat ultricies. Duis ultricies, purus ac
              luctus suscipit, nisl nisl molestie nisl, ac luctus nisl molestie
              nisl. Praesent eget purus nec ligula feugiat ultricies.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default ConsumeProduct;
