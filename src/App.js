// src/App.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import CreateAccount from "./pages/create-account.js";
import DashboardUser from "./pages/dashboard-user.js";
import LandingPage from "./pages/landing-page.js";
import Login from "./pages/login.js";
import Products from "./pages/products.js";
import UserScreen from "./pages/user-screen.js";
import CreateProduct from "./pages/create-product.js";
import ProductDetails from './pages/product-details.js';

import CreateAccountComprador from "./pages/create-account-comprador.js";
import ProdutosDisponiveis from "./pages/produtos-disponiveis.js";
import ProdutosComprados from "./pages/produtos-comprados.js";
import LoginComprador from "./pages/login-comprador.js";
import ConsumirProduto from "./pages/consumir-produto.js";
import UserScreenComprador from "./pages/user-screen-comprador.js";

import "./styles/landing-page.css";
import "./styles/create-account.css";
import "./styles/dashboard-user.css";
import "./styles/login.css";
import "./styles/products.css";
import "./styles/user-screen.css";
import "./index.css";
import "./styles/create-product.css";
import "./styles/product-details.css";

import "./styles/create-account-comprador.css";
import "./styles/produtos-disponiveis.css";
import "./styles/login-comprador.css";
import "./styles/consumir-produto.css";
import "./styles/produtos-comprados.css";
import "./styles/user-screen-comprador.css";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/dashboard-user" element={<DashboardUser />} />
        <Route path="/create-product" element={<CreateProduct />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/user-screen" element={<UserScreen />} />
        <Route path="/login" element={<Login />} />

        <Route path="/create-account-comprador" element={<CreateAccountComprador />} />
        <Route path="/produtos-disponiveis" element={<ProdutosDisponiveis />} />
        <Route path="/login-comprador" element={<LoginComprador />} />
        <Route path="/consumir-produto" element={<ConsumirProduto />} />
        <Route path="/produtos-comprados" element={<ProdutosComprados />} />
        <Route path="/user-screen-comprador" element={<UserScreenComprador />} />
      </Routes>
    </div>
  );
}

export default App;

// create-account / create-product / 