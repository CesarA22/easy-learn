import React from "react";
import { Route, Routes } from "react-router-dom";

import AvailableProducts from "./pages-buyer/available-products.js";
import BoughtProducts from "./pages-buyer/bought-products.js";
import ConsumeProduct from "./pages-buyer/consume-product.js";
import CreateAccountBuyer from "./pages-buyer/create-account-buyer.js";
import LoginBuyer from "./pages-buyer/login-buyer.js";
import UserScreenBuyer from "./pages-buyer/user-screen-buyer.js";
import BuyProduct from "./pages-buyer/buy-product.js";
import PurchaseConfirmation from "./pages-buyer/purchase-confirmation.js";
import VerifiedPayment from "./pages-buyer/verified-payment.js";

import CreateAccountSeller from "./pages-seller/create-account-seller.js";
import CreateProduct from "./pages-seller/create-product.js";
import Dashboard from "./pages-seller/dashboard.js";
import LandingPage from "./pages-seller/landing-page.js";
import LoginSeller from "./pages-seller/login-seller.js";
import ProductDetails from "./pages-seller/product-details.js";
import Products from "./pages-seller/products.js";
import UserScreenSeller from "./pages-seller/user-screen-seller.js";

import "./index.css";

import "./styles-buyer/available-products.css";
import "./styles-buyer/bought-products.css";
import "./styles-buyer/consume-product.css";
import "./styles-buyer/create-account-buyer.css";
import "./styles-buyer/login-buyer.css";
import "./styles-buyer/user-screen-buyer.css";
import "./styles-buyer/buy-product.css";
import "./styles-buyer/purchase-confirmation.css";
import "./styles-buyer/verified-payment.css";

import "./styles-seller/create-account-seller.css";
import "./styles-seller/create-product.css";
import "./styles-seller/dashboard.css";
import "./styles-seller/landing-page.css";
import "./styles-seller/login-seller.css";
import "./styles-seller/product-details.css";
import "./styles-seller/products.css";
import "./styles-seller/user-screen-seller.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/available-products" element={<AvailableProducts />} />
        <Route path="/bought-products" element={<BoughtProducts />} />
        <Route path="/consume-product" element={<ConsumeProduct />} />
        <Route path="/create-account-buyer" element={<CreateAccountBuyer />} />
        <Route path="/login-buyer" element={<LoginBuyer />} />
        <Route path="/user-screen-buyer" element={<UserScreenBuyer />} />
        <Route path="/buy-product" element={<BuyProduct />} />
        <Route
          path="/purchase-confirmation"
          element={<PurchaseConfirmation />}
        />
        <Route path="/verified-payment" element={<VerifiedPayment />} />

        <Route
          path="/create-account-seller"
          element={<CreateAccountSeller />}
        />
        <Route path="/create-product" element={<CreateProduct />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login-seller" element={<LoginSeller />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/user-screen-seller" element={<UserScreenSeller />} />
      </Routes>
    </div>
  );
}

export default App;
