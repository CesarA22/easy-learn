import React from 'react';
import { X, ShoppingCart as CartIcon, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export const ShoppingCart = () => {
    const { isCartOpen, setIsCartOpen, cartItems, removeFromCart, updateQuantity, getTotal } =
        useCart();
    const navigate = useNavigate();

    const handleCheckout = () => {
        navigate('/purchase-confirmation');
        setIsCartOpen(false);
    };

    return (
        <>
            {isCartOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"
                    onClick={() => setIsCartOpen(false)}
                />
            )}

            <div
                className={`
        fixed right-0 top-0 h-full w-96 bg-gray-900 shadow-xl 
        transform transition-transform duration-300 ease-in-out z-50
        ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}
      `}
            >
                <div className="h-full flex flex-col">
                    {/* Header */}
                    <div className="p-4 border-b border-gray-800">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                                <CartIcon size={24} />
                                Carrinho
                            </h2>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="p-2 hover:bg-gray-800 rounded-full transition-colors"
                            >
                                <X size={20} className="text-gray-400 hover:text-white" />
                            </button>
                        </div>
                    </div>

                    {/* Cart Items */}
                    <div className="flex-1 overflow-y-auto py-4">
                        {cartItems.length === 0 ? (
                            <div className="text-center p-6 text-gray-500">
                                Seu carrinho está vazio
                            </div>
                        ) : (
                            <div className="space-y-4 px-4">
                                {cartItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className="bg-gray-800 rounded-lg p-4 flex gap-4"
                                    >
                                        <div className="w-20 h-20 bg-gray-700 rounded-md overflow-hidden">
                                            {item.image && (
                                                <img
                                                    src={`${process.env.REACT_APP_BACKEND_URL}/images/${item.image}`}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-white font-medium">{item.title}</h3>
                                            <p className="text-sm text-gray-400">
                                                R$ {item.price.toFixed(2)}
                                            </p>
                                            <div className="flex items-center gap-2 mt-2">
                                                <button
                                                    onClick={() =>
                                                        updateQuantity(item.id, item.quantity - 1)
                                                    }
                                                    className="p-1 hover:bg-gray-700 rounded"
                                                >
                                                    <Minus size={16} className="text-gray-400" />
                                                </button>
                                                <span className="text-white">{item.quantity}</span>
                                                <button
                                                    onClick={() =>
                                                        updateQuantity(item.id, item.quantity + 1)
                                                    }
                                                    className="p-1 hover:bg-gray-700 rounded"
                                                >
                                                    <Plus size={16} className="text-gray-400" />
                                                </button>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="ml-auto p-1 hover:bg-gray-700 rounded"
                                                >
                                                    <Trash2 size={16} className="text-red-400" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="border-t border-gray-800 p-4">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-white font-semibold">Total:</span>
                            <span className="text-white font-bold">R$ {getTotal().toFixed(2)}</span>
                        </div>
                        <button
                            onClick={handleCheckout}
                            disabled={cartItems.length === 0}
                            className={`
                w-full py-3 rounded-lg font-semibold
                ${
                    cartItems.length === 0
                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700 transition-colors'
                }
              `}
                        >
                            Finalizar Compra
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export const CartButton = () => {
    const { cartItems, setIsCartOpen } = useCart();

    return (
        <button
            onClick={() => setIsCartOpen(true)}
            className="fixed right-6 bottom-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        >
            <div className="relative">
                <CartIcon size={24} />
                {cartItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {cartItems.length}
                    </span>
                )}
            </div>
        </button>
    );
};
