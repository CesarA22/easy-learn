import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, CheckCircle } from 'lucide-react';
import { Logo } from '../components/logo';
import '../styles-buyer/verified-payment.css';

export function VerifiedPayment() {
    const navigate = useNavigate();
    const location = useLocation();
    const { orderData, items, total } = location.state || {};

    const formatPrice = (price) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(price);
    };

    if (!orderData) {
        navigate('/available-products');
        return null;
    }

    return (
        <div className="verified-payment">
            <main className="verified-payment__container">
                <header>
                    <div className="verified-payment__header">
                        <button onClick={() => navigate('/available-products')} className="back-button">
                            <ChevronLeft size={24} />
                            Voltar
                        </button>
                        <Logo />
                    </div>
                </header>
                <section className="verified-payment__content">
                    <div className="verified-payment__status">
                        <CheckCircle className="success-icon" size={48} />
                        <h2>Pagamento Confirmado!</h2>
                        <p>Sua compra foi realizada com sucesso</p>
                    </div>

                    <div className="verified-payment__order">
                        <h3>Detalhes do Pedido</h3>
                        <div className="order-items">
                            {items?.map((item) => (
                                <div key={item.id} className="order-item">
                                    <div className="item-image">
                                        {item.image && (
                                            <img
                                                src={`${process.env.REACT_APP_BACKEND_URL}/images/${item.image}`}
                                                alt={item.title}
                                            />
                                        )}
                                    </div>
                                    <div className="item-details">
                                        <h4>{item.title}</h4>
                                        <p className="item-quantity">Quantidade: {item.quantity}</p>
                                        <p className="item-price">{formatPrice(item.price * item.quantity)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="order-total">
                            <span>Total Pago:</span>
                            <span className="total-amount">{formatPrice(total)}</span>
                        </div>
                    </div>

                    <div className="verified-payment__actions">
                        <button
                            onClick={() => navigate('/bought-products')}
                            className="primary-button"
                        >
                            Ver Meus Produtos
                        </button>
                        <button
                            onClick={() => navigate('/available-products')}
                            className="secondary-button"
                        >
                            Continuar Comprando
                        </button>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default VerifiedPayment;