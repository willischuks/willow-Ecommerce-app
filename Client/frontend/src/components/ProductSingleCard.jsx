// ProductSingleCard.jsx
import React from 'react';
import { Card, Button } from "flowbite-react";
import { useCart } from '../context/CartContext';

const ProductSingleCard = ({ product }) => {
    const { addToCart, removeFromCart, cartItems } = useCart();
    if (!product) return <Card className="max-w-sm flex items-center justify-center h-full"><p>Product data unavailable.</p></Card>;

    const itemInCart = cartItems.find(item => item._id === product._id);
    const quantity = itemInCart ? itemInCart.quantity : 0;

    return (
        <Card className="max-w-sm flex flex-col justify-between h-full">
        <img
            className="rounded-t-lg w-full object-cover h-64"  
            src={product.imageUrl || 'https://via.placeholder.com/400x300?text=No+Image'}
            alt={product.name || 'Product Image'}
        />
        <div className="px-4 py-3 flex flex-col justify-between h-full">
            <h5 className="text-xs font-semibold text-gray-900 dark:text-white mb-2">{product.name || 'Untitled Product'}</h5>
            <span className="text-sm font-bold text-gray-900 dark:text-white mb-4">${((product.priceInCents || 0) / 100).toFixed(2)}</span>
            <div className="flex justify-end">
            {quantity > 0 ? (
                <Button color="remove" onClick={() => removeFromCart(product._id)} className="px-4 py-1.5 text-sm">Remove</Button>
            ) : (
                <Button color="green" onClick={() => addToCart(product)} className="px-4 py-1.5 text-sm">Add to cart</Button>
            )}
            </div>
        </div>
        </Card>
    );
};

export default ProductSingleCard;
