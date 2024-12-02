import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext.js';
import { CartProvider } from './context/CartContext.js';
import { SlidingCart } from './components/sliding-cart.js';

import AvailableProducts from './pages-buyer/available-products.js';
import BoughtProducts from './pages-buyer/bought-products.js';
import BuyProduct from './pages-buyer/buy-product.js';
import ConsumeProduct from './pages-buyer/consume-product.js';
import CreateAccountBuyer from './pages-buyer/create-account-buyer.js';
import LoginBuyer from './pages-buyer/login-buyer.js';
import PurchaseConfirmation from './pages-buyer/purchase-confirmation.js';
import UserScreenBuyer from './pages-buyer/user-screen-buyer.js';
import VerifiedPayment from './pages-buyer/verified-payment.js';
import ViewBoughtProduct from './pages-buyer/view-bought-product.js';

import CreateAccountSeller from './pages-seller/create-account-seller.js';
import CreateProduct from './pages-seller/create-product.js';
import Dashboard from './pages-seller/dashboard.js';
import LandingPage from './pages-seller/landing-page.js';
import LoginSeller from './pages-seller/login-seller.js';
import ProductDetails from './pages-seller/product-details.js';
import Products from './pages-seller/products.js';
import UserScreenSeller from './pages-seller/user-screen-seller.js';

import './index.css';

import './styles-buyer/available-products.css';
import './styles-buyer/bought-products.css';
import './styles-buyer/buy-product.css';
import './styles-buyer/consume-product.css';
import './styles-buyer/create-account-buyer.css';
import './styles-buyer/login-buyer.css';
import './styles-buyer/purchase-confirmation.css';
import './styles-buyer/user-screen-buyer.css';
import './styles-buyer/verified-payment.css';
import './styles-buyer/view-bought-product.css';

import './styles-seller/create-account-seller.css';
import './styles-seller/create-product.css';
import './styles-seller/dashboard.css';
import './styles-seller/landing-page.css';
import './styles-seller/login-seller.css';
import './styles-seller/product-details.css';
import './styles-seller/products.css';
import './styles-seller/user-screen-seller.css';

function App() {
    const buyerPages = [
        '/available-products',
        '/bought-products',
        '/buy-product',
        '/consume-product',
        '/purchase-confirmation',
        '/user-screen-buyer',
        '/verified-payment',
        '/view-bought-product',
    ];

    const isBuyerPage = () => {
        return buyerPages.some(
            (page) =>
                window.location.pathname.startsWith(page) ||
                window.location.pathname.match(/\/consume-product\/\d+/),
        );
    };

    return (
        <AuthProvider>
            <CartProvider>
                <div className="App">
                    <Routes>
                        <Route path="/" element={<LandingPage />} />

                        {/* Buyer Routes */}
                        <Route path="/available-products" element={<AvailableProducts />} />
                        <Route path="/bought-products" element={<BoughtProducts />} />
                        <Route path="/buy-product" element={<BuyProduct />} />
                        <Route path="/consume-product/:id" element={<ConsumeProduct />} />
                        <Route path="/create-account-buyer" element={<CreateAccountBuyer />} />
                        <Route path="/login-buyer" element={<LoginBuyer />} />
                        <Route path="/purchase-confirmation" element={<PurchaseConfirmation />} />
                        <Route path="/user-screen-buyer" element={<UserScreenBuyer />} />
                        <Route path="/verified-payment" element={<VerifiedPayment />} />
                        <Route path="/view-bought-product/:id" element={<ViewBoughtProduct />} />

                        {/* Seller Routes */}
                        <Route path="/create-account-seller" element={<CreateAccountSeller />} />
                        <Route path="/create-product" element={<CreateProduct />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/login-seller" element={<LoginSeller />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/products/:id" element={<ProductDetails />} />
                        <Route path="/user-screen-seller" element={<UserScreenSeller />} />
                    </Routes>

                    {isBuyerPage() && window.location.pathname !== '/purchase-confirmation' && (
                        <SlidingCart />
                    )}
                </div>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;
