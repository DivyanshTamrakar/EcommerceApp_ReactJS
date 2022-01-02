import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {  CartProvider } from "./context/cart-context";
import { AddressProvider } from "./context/AddressContext";
import { WishlistProvider } from './context/wishlist-context';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router  } from "react-router-dom";
import { LoaderProvider } from './context/LoaderContext';
import { ProductProvider } from './context/ProductContext';


ReactDOM.render(
  
  <React.StrictMode>
      <Router>
      <AuthProvider>
      <LoaderProvider>
      <ProductProvider>
      <AddressProvider>
      <WishlistProvider>
      <CartProvider>
      <App />
      </CartProvider>
      </WishlistProvider>
      </AddressProvider>
      </ProductProvider>
      </LoaderProvider>
      </AuthProvider>
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

