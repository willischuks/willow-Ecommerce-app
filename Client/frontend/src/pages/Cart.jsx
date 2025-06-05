// Cart.jsx
import React from 'react';
import { useCart } from "../context/CartContext";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Button, Card, Spinner } from 'flowbite-react';
import { HiMinus, HiPlus, HiTrash } from 'react-icons/hi';
import { Link } from 'react-router-dom'; 

const stripePromise = loadStripe(import.meta.env.VITE_REACT_APP_STRIPE_PUBLIC_KEY || 'pk_test_51RR0gPRcZSG0tFPiZVcL8HWWblLgybzjJmF3Mr724t97yfuQdNEYZ5h9SMWiQ7hWPUYwfImeOXE7qvB8hnLMoh2N00xKmzhPkr');

const Cart = () => {
    const { cartItems, decreaseCartItemQuantity, addToCart, clearCart } = useCart();
    const [isProcessingCheckout, setIsProcessingCheckout] = React.useState(false);

    const SERVER_BASE_URL = import.meta.env.VITE_REACT_APP_SERVER_BASE_URL;

    const totalPrice = cartItems.reduce((acc, item) => acc + item.priceInCents * item.quantity, 0);

    const handleCheckout = async () => {
        setIsProcessingCheckout(true);
        const stripe = await stripePromise;

        const transformedItems = cartItems.map(item => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.name,
                    images: [item.imageUrl || 'https://via.placeholder.com/150'],
                },
                unit_amount: item.priceInCents,
            },
            quantity: item.quantity
        }));

        try {
            const response = await axios.post(
                `${SERVER_BASE_URL}/stripe/create-checkout-session`,
                {
                    items: transformedItems,
                    success_url: `${window.location.origin}/success`,
                    cancel_url: `${window.location.origin}/cart`,
                }
            );

            const { error } = await stripe.redirectToCheckout({
                sessionId: response.data.id
            });

            if (error) {
                console.error('Error during Stripe checkout redirection: ', error);
                
            }
        } catch (error) {
            console.error('Checkout process error:', error);
            
        } finally {
            setIsProcessingCheckout(false);
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className='flex flex-col items-center justify-center min-h-[calc(100vh-100px)] bg-gray-50 dark:bg-gray-900 py-8 mt-16'>
                <h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>Your Cart is Empty</h2>
                <p className='text-lg text-gray-600 dark:text-gray-400 mb-8'>
                    Looks like you haven't added anything to your cart yet.
                </p>
                <Link to="/shop">
                    <Button color="blue" size="lg">
                        Start Shopping
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-gray-50 dark:bg-gray-900 py-8 '>
            <div className='max-w-[1000px] mx-auto p-4'> 
                <h2 className='text-3xl font-extrabold text-gray-900 dark:text-white mb-8 text-center'>Your Shopping Cart</h2>
                <div className='grid grid-cols-1 gap-4'> 
                    {cartItems.map((item) => (
                        <Card key={item._id} className='flex-col sm:flex-row items-center p-3 bg-white dark:bg-gray-800 shadow-md rounded-lg'> 
                            <img
                                src={item.imageUrl || 'https://via.placeholder.com/100'}
                                alt={item.name}
                                className='w-28 h-28 sm:w-24 sm:h-24 object-cover rounded-md mb-3 sm:mb-0 sm:mr-4' 
                            />
                            <div className='flex flex-col justify-between flex-grow w-full sm:w-auto text-center sm:text-left'>
                                <div>
                                    <h3 className='text-lg font-bold text-gray-900 dark:text-white mb-1'>{item.name}</h3> 
                                    <p className='text-md text-gray-700 dark:text-gray-300'>Price: <span className="font-semibold">${(item.priceInCents / 100).toFixed(2)}</span></p> 
                                </div>
                                <div className='flex items-center justify-center sm:justify-start mt-3 space-x-3'> 
                                    <p className='text-md font-medium text-gray-900 dark:text-white mr-2'>Qty:</p>
                                    <Button
                                        color="light"
                                        onClick={() => decreaseCartItemQuantity(item._id)}
                                        size="xs" 
                                        className="p-0.5" 
                                        aria-label="Decrease quantity"
                                    >
                                        <HiMinus className="h-3 w-3" /> 
                                    </Button>
                                    <span className='text-md font-medium text-gray-900 dark:text-white'>
                                        {item.quantity}
                                    </span>
                                    <Button
                                        color="light"
                                        onClick={() => addToCart(item)}
                                        size="xs" 
                                        className="p-0.5" 
                                        aria-label="Increase quantity"
                                    >
                                        <HiPlus className="h-3 w-3" /> 
                                    </Button>
                                    {/* Delete button */}
                                    <Button
                                        color="red"
                                        onClick={() => decreaseCartItemQuantity(item._id, true)}
                                        size="sm" 
                                        className="ml-4" 
                                        aria-label="Remove item"
                                    >
                                        <HiTrash className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
                    {/* Cheakout/Total Price */}
                <div className='flex flex-col md:flex-row md:justify-between items-center bg-white dark:bg-gray-800 p-5 rounded-lg shadow-xl mt-6'> 
                    <p className='text-2xl font-bold text-gray-900 dark:text-white mb-3 md:mb-0'>
                        Total: <span className="text-teal-600 dark:text-teal-400">${(totalPrice / 100).toFixed(2)}</span>
                    </p>
                    <div className='flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full md:w-auto'>
                        <Button
                            color="gray"
                            onClick={clearCart}
                            className="w-full text-xs" 
                            disabled={cartItems.length === 0 || isProcessingCheckout}
                        >
                            Clear Cart
                        </Button>
                        <Button
                            color="blue"
                            onClick={handleCheckout}
                            className="w-full text-xs" 
                            disabled={isProcessingCheckout}
                        >
                            {isProcessingCheckout ? (
                                <div className="flex items-center">
                                    <Spinner size="sm" className="mr-2" />
                                    Processing...
                                </div>
                            ) : (
                                'Checkout'
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;