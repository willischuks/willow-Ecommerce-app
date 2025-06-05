import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './style.css'
import { SnackbarProvider } from 'notistack';
import { CartProvider } from './context/CartContext.jsx';
import 'flowbite/dist/flowbite.min.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <SnackbarProvider>
            <CartProvider>
                <App />
            </CartProvider>
        </SnackbarProvider>
    </BrowserRouter>
);