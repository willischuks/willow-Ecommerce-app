
// Cancel.jsx
import React from 'react';
import { Button } from 'flowbite-react'; 
import { HiXCircle } from 'react-icons/hi'; 
import { Link } from 'react-router-dom'; 

const CancelPage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 py-6 mt-16"> 
            <div className="text-center p-6 rounded-lg shadow-lg bg-white dark:bg-gray-800 max-w-sm w-full animate-fade-in-up"> 
                <HiXCircle className="mx-auto mb-3 h-16 w-16 text-red-500 dark:text-red-400" /> 
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3"> 
                    Payment Canceled
                </h1>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-5"> 
                    Your payment was canceled. If you still want to complete your purchase, please try again.
                </p>
                <div className="flex flex-col gap-3"> 
                    <Link to="/cart" className="w-full">
                        <Button color="blue" size="md" className="w-full">
                            Return to Cart
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CancelPage;