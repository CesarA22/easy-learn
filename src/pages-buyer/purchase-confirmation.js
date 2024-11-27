import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Copy, Timer } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { QRCodeCanvas } from 'qrcode.react';
import '../styles-buyer/purchase-confirmation.css';

export function PurchaseConfirmation() {
    const navigate = useNavigate();
    const { cartItems, getTotal, clearCart } = useCart();
    const { user } = useContext(AuthContext);
    const [isPixModalOpen, setIsPixModalOpen] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [timer, setTimer] = useState(600);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [pixCode, setPixCode] = useState('');

    const formatPrice = (price) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(price);
    };

    useEffect(() => {
        let intervalId;

        if (isPixModalOpen && timer > 0 && !isProcessing) {
            intervalId = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        }

        if (timer <= 0) {
            clearInterval(intervalId);
        }

        return () => clearInterval(intervalId);
    }, [isPixModalOpen, timer, isProcessing]);

    useEffect(() => {
        if (isPixModalOpen) {
            const generatedPixCode = `00020126580014br.gov.bcb.pix0136${Math.random()
                .toString(36)
                .substring(2, 15)}-e89b-12d3`;
            setPixCode(generatedPixCode);
        }
    }, [isPixModalOpen]);

    const handlePayment = () => {
        setIsPixModalOpen(true);
    };

    const handleConfirmPayment = async () => {
        try {
            setIsProcessing(true);

            await new Promise((resolve) => setTimeout(resolve, 3000));

            setShowConfirmation(true);
            await new Promise((resolve) => setTimeout(resolve, 2000));

            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/buyer/checkout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    buyerId: user.id,
                }),
            });

            if (!response.ok) {
                throw new Error('Erro ao processar o checkout');
            }

            const orderData = await response.json();

            clearCart();

            navigate('/verified-payment', {
                state: {
                    orderData,
                    items: cartItems,
                    total: getTotal(),
                },
            });
        } catch (error) {
            console.error('Erro no checkout:', error);
            alert('Erro ao processar o pagamento. Tente novamente.');
        } finally {
            setIsProcessing(false);
            setShowConfirmation(false);
        }
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };

    return (
        <div className="purchase-confirmation">
            <main className="purchase-confirmation__container">
                <header className="confirmation-header">
                    <button onClick={() => navigate(-1)} className="back-button">
                        <ChevronLeft size={24} />
                        Voltar
                    </button>
                    <h1>Confirmação de Compra</h1>
                </header>

                <div className="confirmation-content">
                    <section className="order-summary">
                        <h2>Resumo do Pedido</h2>
                        <div className="items-list">
                            {cartItems.map((item) => (
                                <div key={item.id} className="order-item">
                                    <div className="item-image">
                                        {item.image && (
                                            <img
                                                src={`${process.env.REACT_APP_BACKEND_URL}/images/${item.image}`}
                                                alt={item.title}
                                            />
                                        )}
                                    </div>
                                    <div className="item-info">
                                        <h3>{item.title}</h3>
                                        <p className="item-quantity">Quantidade: {item.quantity}</p>
                                        <p className="item-price">
                                            {formatPrice(item.price * item.quantity)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="order-total">
                            <div className="total-row">
                                <span>Subtotal:</span>
                                <span>{formatPrice(getTotal())}</span>
                            </div>
                            <div className="total-row final">
                                <span>Total:</span>
                                <span>{formatPrice(getTotal())}</span>
                            </div>
                        </div>
                    </section>

                    <section className="payment-section">
                        <h2>Pagamento via PIX</h2>
                        <p>Para concluir sua compra, realize o pagamento via PIX.</p>
                        <button
                            onClick={handlePayment}
                            className="pay-button"
                            disabled={cartItems.length === 0}
                        >
                            {cartItems.length === 0 ? 'Carrinho vazio' : 'Gerar PIX'}
                        </button>
                    </section>
                </div>
            </main>

            {isPixModalOpen && (
                <div className="pix-modal-overlay">
                    <div className="pix-modal">
                        {!showConfirmation ? (
                            <>
                                <h2>Pagamento PIX</h2>
                                <div className="pix-qr-container">
                                    <QRCodeCanvas value={pixCode} size={200} />
                                </div>
                                <div className="pix-copy-section">
                                    <p>Código PIX:</p>
                                    <div className="pix-code">
                                        <span>{pixCode}</span>
                                        <button className="copy-button">
                                            <Copy size={20} />
                                        </button>
                                    </div>
                                </div>
                                <div className="pix-timer">
                                    <Timer size={20} />
                                    <span>
                                        {isProcessing
                                            ? 'Confirmando...'
                                            : `Expira em ${formatTime(timer)}`}
                                    </span>
                                </div>
                                <button
                                    onClick={handleConfirmPayment}
                                    className="confirm-payment-button"
                                    disabled={isProcessing}
                                >
                                    {isProcessing
                                        ? 'Processando...'
                                        : 'Simular Confirmação do Pagamento'}
                                </button>
                                <button
                                    onClick={() => setIsPixModalOpen(false)}
                                    className="close-button"
                                >
                                    Fechar
                                </button>
                            </>
                        ) : (
                            <div className="confirmation-animation">
                                <div className="checkmark-circle">
                                    <span className="checkmark"></span>
                                </div>
                                <p>Pagamento Confirmado!</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default PurchaseConfirmation;
