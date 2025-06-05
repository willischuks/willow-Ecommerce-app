
// Home.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Carousel, Button, Spinner } from 'flowbite-react'; 
import ProductCard from '../components/ProductCard'; 

const chunkArray = (arr, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        chunks.push(arr.slice(i, i + chunkSize));
    }
    return chunks;
};

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 

    const SERVER_BASE_URL = import.meta.env.VITE_REACT_APP_SERVER_BASE_URL;
    
    const [productsPerSlide, setProductsPerSlide] = useState(3); 


    const updateProductsPerSlide = () => {
        if (window.innerWidth >= 1280) { // xl screens
            setProductsPerSlide(4);
        } else if (window.innerWidth >= 1024) { // lg screens
            setProductsPerSlide(3);
        } else if (window.innerWidth >= 768) { // md screens
            setProductsPerSlide(2);
        } else { // sm and default
            setProductsPerSlide(1);
        }
    };

    useEffect(() => {
        updateProductsPerSlide();
        window.addEventListener('resize', updateProductsPerSlide);

        setLoading(true);
        setError(null); 
        axios
            .get(`${SERVER_BASE_URL}/products`)
            .then((response) => {
                if (Array.isArray(response.data.products)) {
                    setProducts(response.data.products);
                } else {
                    console.error('API response.data.products is not an array:', response.data.products);
                    setProducts([]);
                    setError("Failed to load products: Unexpected data format.");
                }
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
                setError("Failed to load products. Please try again later."); 
                setProducts([]); 
            })
            .finally(() => {
                setLoading(false);
            });

        
        return () => window.removeEventListener('resize', updateProductsPerSlide);
    }, [SERVER_BASE_URL]); 

    const carouselProducts = Array.isArray(products) ? products.slice(0, 12) : [];
    const productChunks = chunkArray(carouselProducts, productsPerSlide);

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
            {/* Hero Section */}
            <div className="relative isolate px-4 py-8 sm:px-6 lg:px-8 bg-gradient-to-r from-teal-500 to-blue-600 dark:from-teal-700 dark:to-blue-800 text-white shadow-lg ">
                <div className="absolute inset-x-0 -top-10 -z-10 transform-gpu overflow-hidden blur-xl sm:-top-20" aria-hidden="true">
                    <div className="relative left-[calc(50%-6rem)] aspect-[1155/678] w-[25rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-15rem)] sm:w-[50rem]" style={{
                        clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }} />
                </div>
                <div className="mx-auto max-w-lg py-8 sm:py-12 lg:py-16 text-center">
                    <h1 className="text-2xl font-bold tracking-tight sm:text-4xl animate-fade-in-up">
                        Welcome to <span className="text-yellow-300 dark:text-yellow-200">Willow.</span>
                    </h1>
                    <p className="mt-3 text-xs leading-6 animate-fade-in delay-200 max-w-prose mx-auto">
                        At Willow, we're all about movie magic.
                        Whether you're hunting for that rare vintage poster or just want something cool for your wall, we've got you covered.
                        From all-time classics to today's biggest hits, we stock posters in every size and condition—brand new, gently used, framed, or rolled.
                        It's more than just decoration—it's a way to relive your favorite moments, scenes, and stories.
                        Willow is where movie lovers find their perfect piece of the big screen.
                    </p>
                    <div className="mt-6 flex items-center justify-center gap-x-3 animate-fade-in-up delay-400">
                        <Button href="/shop" className="bg-white text-blue-600 hover:bg-gray-100 focus:ring-blue-500 font-semibold px-4 py-1.5 text-sm rounded-lg shadow">
                            Shop All Products
                        </Button>
                        <a href="/about" className="text-xs font-semibold leading-6 text-white hover:text-gray-200">
                            Learn more <span aria-hidden="true">→</span>
                        </a>
                    </div>
                </div>
                <div className="absolute inset-x-0 top-[calc(100%-8rem)] -z-10 transform-gpu overflow-hidden blur-xl sm:top-[calc(100%-20rem)]" aria-hidden="true">
                    <div className="relative left-[calc(50%+2rem)] aspect-[1155/678] w-[25rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+20rem)] sm:w-[50rem]" style={{
                        clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }} />
                </div>
            </div>

            {/* Latest Products Carousel Section */}
            <div className="max-w-[1200px] mx-auto py-8 px-4"> 
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center">
                    Latest Products
                </h2>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <Spinner size="xl" />
                        <p className="ml-4 text-gray-500 dark:text-gray-400 text-lg">Loading products...</p>
                    </div>
                ) : error ? (
                    <div className="text-center text-red-500 dark:text-red-400 py-8">
                        <p>{error}</p>
                    </div>
                ) : (
                    carouselProducts.length > 0 ? (
                        <div className="h-[350px] sm:h-[300px] md:h-[420px] lg:h-[450px] xl:h-[480px] w-full">
                            <Carousel slideInterval={5000} pauseOnHover>
                                {productChunks.map((chunk, index) => (
                                    <div
                                        key={index}
                                        className="flex justify-center items-center h-full p-2"
                                    >
                                        <div
                                            className={`grid gap-4 w-full max-w-full 
                                            ${productsPerSlide === 1 ? 'grid-cols-1' : ''}
                                            ${productsPerSlide === 2 ? 'grid-cols-1 sm:grid-cols-2' : ''}
                                            ${productsPerSlide === 3 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : ''}
                                            ${productsPerSlide === 4 ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4' : ''}
                                            `}
                                        >
                                            {chunk.map((item) => (
                                                <div key={item._id} className="flex justify-center h-full">
                                                    <ProductCard product={item} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </Carousel>
                        </div>
                    ) : (
                        <p className="text-center text-gray-500 dark:text-gray-400 text-xl">No products found to display.</p>
                    )
                )}
            </div>
        </div>
    );
};

export default Home;