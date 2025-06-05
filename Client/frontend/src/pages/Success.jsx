// Success.jsx
import React, { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { Button } from 'flowbite-react';
import { HiCheckCircle } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const SuccessPage = () => {
    const { clearCart } = useCart();
    const cartClearedRef = React.useRef(false);

    useEffect(() => {
        if (!cartClearedRef.current) {
            console.log('Payment was successful, clearing cart');
            clearCart();
            cartClearedRef.current = true;
        }
    }, [clearCart]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 py-6 mt-16"> 
            <div className="text-center p-6 rounded-lg shadow-lg bg-white dark:bg-gray-800 max-w-sm w-full animate-fade-in-up"> 
                <HiCheckCircle className="mx-auto mb-3 h-16 w-10 text-green-500 dark:text-green-400" /> 
                <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-3"> 
                    Payment Successful!
                </h1>
                <p className="text-xs text-gray-700 dark:text-gray-300 mb-5"> 
                    Your order has been placed successfully. A confirmation email will be sent shortly.
                </p>
                <div className="flex flex-col gap-3"> 
                    <Link to="/shop" className="w-full"> 
                        <Button color="blue" size="md" className="w-full"> 
                            Continue Shopping
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SuccessPage;
