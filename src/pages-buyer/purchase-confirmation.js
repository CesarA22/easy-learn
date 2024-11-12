import { Sidebar } from '../components/sidebar.js';
import { useNavigate } from 'react-router-dom';
import { LuChevronLeftCircle as LeftChevron } from 'react-icons/lu';
import { Logo } from '../components/logo';

export function PurchaseConfirmation() {
    const navigate = useNavigate();
    return (
        <div className="purchase-confirmation">
            <main className="purchase-confirmation__container">
                <header>
                    <h1 className="purchase-confirmation__header">
                        <button onClick={() => navigate('/available-products')}>
                            <LeftChevron />
                        </button>
                        Pagamento Online:
                    </h1>
                    <Logo />
                </header>
                <section className="purchase-confirmation__content">
                    <h2>Produto Selecionado:</h2>
                    {/* product card*/}
                    <div className="purchase-confirmation__product">
                        <div className="purchase-confirmation__product__img" />
                        <div>
                            <h3>Nome do Produto</h3>
                            <div className="purchase-confirmation__categories">
                                <div>Curso</div>
                                <div>Educacao</div>
                                <div>Financa</div>
                            </div>
                            <p>
                                Lorem Ipsum is simply dummy text of the printing and typesetting
                                industry. Lorem Ipsum has been the industry's standard dummy text
                                ever since the 1500s.
                            </p>
                        </div>
                    </div>
                    <form className="purchase-confirmation__form">
                        <div className="purchase-confirmation__form__price">
                            <label>Preço do produto:</label>
                            <div>R$ 150.40</div>
                        </div>
                        <div className="purchase-confirmation__form">
                            <label htmlFor="num-card">Numero do cartao:</label>
                            <input type="text" id="num-card" name="num-card" />
                        </div>
                        <div className="purchase-confirmation__form">
                            <label htmlFor="name">Nome do titular:</label>
                            <input type="text" id="name" name="name" />
                        </div>
                        <div className="purchase-confirmation__form">
                            <label htmlFor="data">Data</label>
                            <input type="text" id="data" name="data" />
                        </div>
                        <div className="purchase-confirmation__form">
                            <label htmlFor="cvv">CVV</label>
                            <input type="text" id="cvv" name="cvv" />
                        </div>
                        <button onClick={() => navigate('/verified-payment')}>Comprar</button>
                    </form>
                </section>
            </main>
        </div>
    );
}

export default PurchaseConfirmation;
