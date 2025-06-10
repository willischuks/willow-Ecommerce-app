
// ProductCard.jsx
import React from 'react';
import { Card, Button } from "flowbite-react";
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
    if (!product) {
        return (
            <Card className="max-w-[160px] h-[260px] flex flex-col justify-center items-center text-center p-2">
                <p className="text-gray-500 dark:text-gray-400 text-xs">Product data missing.</p>
            </Card>
        );
    }

    const { addToCart, removeFromCart, cartItems } = useCart();
    const itemInCart = cartItems.find(item => item._id === product._id);
    const quantity = itemInCart ? itemInCart.quantity : 0;

    const handleAddToCart = () => {
        addToCart(product);
    };

    const handleRemoveFromCart = () => {
        removeFromCart(product._id);
    };

    return (
        // <Card className="max-w-[170px] h-[280px] flex flex-col justify-between overflow-hidden">
        //     <img
        //         className="rounded-t-lg w-full object-cover h-28"
        //         src={product.imageUrl}
        //         alt={product.name || 'Product Image'}
        //     />
            
        //     <div className="px-2 py-1 flex flex-col justify-between flex-grow">
        //         <h5 className="text-sm font-semibold tracking-tight text-gray-900 dark:text-white mb-0.5 leading-tight line-clamp-2"> 
        //             {product.name || 'Untitled Product'}
        //         </h5>
        //         <span className="text-base font-bold text-gray-900 dark:text-white mb-1">
        //             ${(product.priceInCents / 100).toFixed(2) || '0.00'}
        //         </span>
        //         <div className="flex justify-end mt-auto">
        //             {quantity > 0 ? (
        //                 <Button
        //                     className="bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 text-white hover:bg-gradient-to-br focus:ring-teal-300 dark:focus:ring-teal-800"
        //                     onClick={handleRemoveFromCart}
        //                     size="xs"
        //                 >
        //                     Remove
        //                 </Button>
        //             ) : (
        //                 <Button
        //                     className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white hover:bg-gradient-to-br focus:ring-green-300 dark:focus:ring-green-800"
        //                     onClick={handleAddToCart}
        //                     size="xs"
        //                 >
        //                     Add to cart
        //                 </Button>
        //             )}
        //         </div>
        //     </div>
        // </Card>

        <Card className="max-w-[200px] h-[360px] flex flex-col justify-between overflow-hidden shadow-lg bg-transparent">
    <img
        className="w-full h-52 object-cover"
        src={product.imageUrl}
        alt={product.name || 'Product Image'}
    />

    <div className="px-3 py-2 flex flex-col justify-between flex-grow bg-white dark:bg-gray-800">
        <h5 className="text-base font-bold tracking-tight text-gray-900 dark:text-white mb-1 leading-snug line-clamp-2 text-center"> 
            {product.name || 'Untitled Product'}
        </h5>
        <span className="text-base font-semibold text-gray-900 dark:text-white mb-2 text-center">
            ${(product.priceInCents / 100).toFixed(2) || '0.00'}
        </span>
        <div className="flex justify-center mt-auto">
            {quantity > 0 ? (
                <Button
                    className="bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 text-white hover:bg-gradient-to-br focus:ring-teal-300 dark:focus:ring-teal-800"
                    onClick={handleRemoveFromCart}
                    size="xs"
                >
                    Remove
                </Button>
            ) : (
                <Button
                    className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white hover:bg-gradient-to-br focus:ring-green-300 dark:focus:ring-green-800"
                    onClick={handleAddToCart}
                    size="xs"
                >
                    Add to cart
                </Button>
            )}
        </div>
    </div>
</Card>

    );
};

export default ProductCard;