import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { CartButton, ShoppingCart } from './components/shopping-cart';

// Buyer Pages
import AvailableProducts from './pages-buyer/available-products';
import BoughtProducts from './pages-buyer/bought-products';
import ConsumeProduct from './pages-buyer/consume-product';
import CreateAccountBuyer from './pages-buyer/create-account-buyer';
import LoginBuyer from './pages-buyer/login-buyer';
import UserScreenBuyer from './pages-buyer/user-screen-buyer';
import BuyProduct from './pages-buyer/buy-product';
import PurchaseConfirmation from './pages-buyer/purchase-confirmation';
import VerifiedPayment from './pages-buyer/verified-payment';

// Seller Pages
import CreateAccountSeller from './pages-seller/create-account-seller';
import CreateProduct from './pages-seller/create-product';
import Dashboard from './pages-seller/dashboard';
import LandingPage from './pages-seller/landing-page';
import LoginSeller from './pages-seller/login-seller';
import ProductDetails from './pages-seller/product-details';
import Products from './pages-seller/products';
import UserScreenSeller from './pages-seller/user-screen-seller';

// Styles
import './index.css';

// Buyer Styles
import './styles-buyer/available-products.css';
import './styles-buyer/bought-products.css';
import './styles-buyer/consume-product.css';
import './styles-buyer/create-account-buyer.css';
import './styles-buyer/login-buyer.css';
import './styles-buyer/user-screen-buyer.css';
import './styles-buyer/buy-product.css';
import './styles-buyer/purchase-confirmation.css';
import './styles-buyer/verified-payment.css';

// Seller Styles
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
        '/consume-product',
        '/user-screen-buyer',
        '/buy-product',
        '/purchase-confirmation',
        '/verified-payment'
    ];

    const isBuyerPage = () => {
        return buyerPages.some(page => 
            window.location.pathname.startsWith(page) || 
            window.location.pathname.match(/\/consume-product\/\d+/)
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
                        <Route path="/consume-product/:id" element={<ConsumeProduct />} />
                        <Route path="/create-account-buyer" element={<CreateAccountBuyer />} />
                        <Route path="/login-buyer" element={<LoginBuyer />} />
                        <Route path="/user-screen-buyer" element={<UserScreenBuyer />} />
                        <Route path="/buy-product" element={<BuyProduct />} />
                        <Route path="/purchase-confirmation" element={<PurchaseConfirmation />} />
                        <Route path="/verified-payment" element={<VerifiedPayment />} />

                        {/* Seller Routes */}
                        <Route path="/create-account-seller" element={<CreateAccountSeller />} />
                        <Route path="/create-product" element={<CreateProduct />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/login-seller" element={<LoginSeller />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/products/:id" element={<ProductDetails />} />
                        <Route path="/user-screen-seller" element={<UserScreenSeller />} />
                    </Routes>

                    {/* Render cart components only on buyer pages */}
                    {isBuyerPage() && (
                        <>
                            <CartButton />
                            <ShoppingCart />
                        </>
                    )}
                </div>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;