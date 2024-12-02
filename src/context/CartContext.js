import React, { createContext, useState, useContext, useEffect } from 'react';
import { AuthContext } from './AuthContext.js';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCartItems(JSON.parse(savedCart));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = async (product) => {
        try {
            if (!user) {
                throw new Error('Usuário não autenticado');
            }

            const token = localStorage.getItem('token');

            // Primeiro, verificamos se já existe um carrinho para o usuário
            const cartResponse = await fetch(
                `${process.env.REACT_APP_BACKEND_URL}/buyer/cart/${user.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            if (!cartResponse.ok) {
                throw new Error('Erro ao acessar carrinho');
            }

            const cartData = await cartResponse.json();

            // Adiciona o item ao carrinho no banco de dados
            await fetch(`${process.env.REACT_APP_BACKEND_URL}/buyer/cart/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    productId: product.id,
                    quantity: 1,
                }),
            });

            // Atualiza o estado local
            setCartItems((prevItems) => {
                const existingItem = prevItems.find((item) => item.id === product.id);
                if (existingItem) {
                    return prevItems.map((item) =>
                        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
                    );
                }
                return [...prevItems, { ...product, quantity: 1 }];
            });

            setIsCartOpen(true);
        } catch (error) {
            console.error('Erro ao adicionar ao carrinho:', error);
            alert('Erro ao adicionar item ao carrinho');
        }
    };

    const removeFromCart = async (productId) => {
        try {
            if (!user) return;

            const token = localStorage.getItem('token');

            await fetch(`${process.env.REACT_APP_BACKEND_URL}/buyer/cart/item/${productId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
        } catch (error) {
            console.error('Erro ao remover do carrinho:', error);
        }
    };

    const updateQuantity = async (productId, newQuantity) => {
        try {
            if (!user) return;

            if (newQuantity < 1) {
                await removeFromCart(productId);
                return;
            }

            const token = localStorage.getItem('token');

            await fetch(`${process.env.REACT_APP_BACKEND_URL}/buyer/cart/item/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ quantity: newQuantity }),
            });

            setCartItems((prevItems) =>
                prevItems.map((item) =>
                    item.id === productId ? { ...item, quantity: newQuantity } : item,
                ),
            );
        } catch (error) {
            console.error('Erro ao atualizar quantidade:', error);
        }
    };

    const clearCart = async () => {
        try {
            if (!user) return;

            const token = localStorage.getItem('token');

            await fetch(`${process.env.REACT_APP_BACKEND_URL}/buyer/cart/clear`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setCartItems([]);
            localStorage.removeItem('cart');
        } catch (error) {
            console.error('Erro ao limpar carrinho:', error);
        }
    };

    const getTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const processCheckout = async (buyerId) => {
        try {
            if (!user) throw new Error('Usuário não autenticado');

            const token = localStorage.getItem('token');

            // 1. Criar a ordem
            const orderResponse = await fetch(
                `${process.env.REACT_APP_BACKEND_URL}/buyer/checkout`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        buyerId,
                        items: cartItems.map((item) => ({
                            productId: item.id,
                            quantity: item.quantity,
                            price: item.price,
                        })),
                        total: getTotal(),
                    }),
                },
            );

            if (!orderResponse.ok) {
                const errorData = await orderResponse.json();
                throw new Error(errorData.message || 'Erro ao processar checkout');
            }

            const orderData = await orderResponse.json();

            // 4. Limpar o carrinho após sucesso
            await clearCart();

            return orderData;
        } catch (error) {
            console.error('Erro no checkout:', error);
            throw error;
        }
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                isCartOpen,
                setIsCartOpen,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                getTotal,
                processCheckout,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
