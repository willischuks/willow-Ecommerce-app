// SearchPage.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom'; 
import axios from 'axios';
import { Spinner } from 'flowbite-react'; 
import ProductCard from '../components/ProductCard'; 

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const query = searchParams.get('query');

    const SERVER_BASE_URL = import.meta.env.VITE_REACT_APP_SERVER_BASE_URL || 'http://localhost:3000';

    useEffect(() => {
        const fetchSearchResults = async () => {
            setLoading(true);
            try {
                
                const response = await axios.get(
                    `${SERVER_BASE_URL}/products/search?query=${query}`
                );
                setSearchResults(response.data);
            } catch (error) {
                console.error('Error fetching search results:', error);
                setSearchResults([]); 
            } finally {
                setLoading(false);
            }
        };

        if (query) {
            fetchSearchResults();
        } else {
            setSearchResults([]);
            setLoading(false);
        }
    }, [query, SERVER_BASE_URL]); 

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-8 mt-8"> 
            <div className="max-w-[1200px] mx-auto p-4">
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6 text-center">
                    Search Results for "{query || ''}"
                </h2>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <Spinner size="xl" />
                        <p className="ml-4 text-gray-500 dark:text-gray-400 text-lg">Loading search results...</p>
                    </div>
                ) : (
                    searchResults.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                            {searchResults.map((product) => (
                                <Link
                                    to={`/products/${product._id}`} 
                                    key={product._id}
                                    className="block" 
                                >
                                    <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg transition-shadow duration-200 ease-in-out overflow-hidden h-full flex flex-col">
                                        {/* Product Image */}
                                        <img
                                            className="rounded-t-lg w-full h-48 object-cover" 
                                            src={product.imageUrl} 
                                            alt={product.name}
                                        />

                                        {/* Product Details */}
                                        <div className="p-5 flex flex-col flex-grow">
                                            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-2">
                                                {product.name}
                                            </h5>
                                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-3 flex-grow">
                                                {product.description.substring(0, 100)}... 
                                            </p>
                                            <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-200 dark:border-gray-700">
                                                <span className="text-xl font-bold text-gray-900 dark:text-white">
                                                    ${(product.priceInCents / 100).toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500 dark:text-gray-400 text-xl mt-10">
                            No products found matching "{query || ''}". Please try a different search.
                        </p>
                    )
                )}
            </div>
        </div>
    );
};

export default SearchPage;