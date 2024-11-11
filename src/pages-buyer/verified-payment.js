import { Sidebar } from "../components/sidebar.js";
import { useNavigate } from "react-router-dom";
import { LuChevronLeftCircle as LeftChevron } from "react-icons/lu";
import { Logo } from "../components/logo";

export function VerifiedPayment() {
  const navigate = useNavigate();
  return (
    <div className="verified-payment">
      <main className="verified-payment__container">
        <header>
          <h1 className="verified-payment__header">
            <button onClick={() => navigate("/available-products")}>
              <LeftChevron />
            </button>
            Status Pagamento:
          </h1>
          <Logo />
        </header>
        <section className="verified-payment__content">
          <div className="verified-payment__status">
            <span>status:</span>
            <div>Pagamento verificado</div>
          </div>
          <div className="verified-payment__hr" />
          <h2>Produto Selecionado:</h2>
          {/* product card*/}
          <div className="verified-payment__product">
            <div className="verified-payment__product__img" />
            <div>
              <h3>Nome do Produto</h3>
              <div className="verified-payment__categories">
                <div>Curso</div>
                <div>Educacao</div>
                <div>Financa</div>
              </div>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s.
              </p>
            </div>
          </div>
          <div
            className="purchase-confirmation__form__price"
            style={{ marginTop: "20px" }}
          >
            <label>Preço do produto:</label>
            <div>R$ 150.40</div>
          </div>
        </section>
        <button
          type="button"
          onClick={() => navigate("/consume-product")}
          className="verified-payment__access-product"
        >
          Acessar Produto
        </button>
      </main>
    </div>
  );
}

export default VerifiedPayment;
