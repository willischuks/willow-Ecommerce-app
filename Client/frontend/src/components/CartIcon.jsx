// CartIcon.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from "../context/CartContext";

const CartIcon = () => {

    const { cartItems } = useCart();
    const totalQuantity =  cartItems.reduce((total, item) => total + item.quantity, 0);
    

    return (
        <Link to="/cart" className="flex items-center hover:text-gray-500 dark:text-gray-400 relative"> 
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>

            {totalQuantity > 0 && (
                
                <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                    {totalQuantity}
                </span>
            )}
        </Link>
    );
};

export default CartIcon;