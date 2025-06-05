// Shop.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard'; 
import { Select, Spinner } from 'flowbite-react';

const Shop = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(true);

    const SERVER_BASE_URL = import.meta.env.VITE_REACT_APP_SERVER_BASE_URL;

    useEffect(() => {
        setLoading(true);
        axios
            .get(`${SERVER_BASE_URL}/products`)
            .then((response) => {
                if (Array.isArray(response.data.products)) {
                    setAllProducts(response.data.products);
                } else {
                    console.error("API response.data.products is not an array:", response.data.products);
                    setAllProducts([]);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
                setAllProducts([]);
                setLoading(false);
            });
    }, [SERVER_BASE_URL]);

    useEffect(() => {
        let currentFiltered = [...allProducts];

        if (category !== '') {
            currentFiltered = currentFiltered.filter((product) => product.category === category);
        }

        setFilteredProducts(currentFiltered);
    }, [allProducts, category]);

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-6 "> 
            <div className="max-w-[1200px] mx-auto p-4">
                <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mt-10 mb-3 text-center"> 
                    All Products
                </h1>

                <div className="filters flex flex-col sm:flex-row justify-end items-center mb-6 gap-3"> 
                    <div className="w-full sm:w-auto">
                        <label htmlFor="category-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Category:
                        </label>
                        <Select
                            id="category-select"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full sm:max-w-[180px]" 
                            color="gray"
                            sizing="sm" 
                        >
                            <option value="">All Categories</option>
                            <option value="Action">Action</option>
                            <option value="Adventure">Adventure</option>
                            <option value="Comedy">Comedy</option>
                            <option value="Drama">Drama</option>
                            <option value="Fantasy">Fantasy</option>
                            <option value="Horror">Horror</option>
                            <option value="Sci-Fi">Sci-Fi</option>
                            <option value="Thriller">Thriller</option>
                            <option value="Animation">Animation</option>
                            <option value="Documentary">Documentary</option>
                            <option value="marvel">Marvel</option>
                            <option value="dc">DC</option>
                            <option value="western">Western</option>
                        </Select>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <Spinner size="xl" />
                        <p className="ml-4 text-gray-500 dark:text-gray-400 text-lg">Loading products...</p>
                    </div>
                ) : (
                    Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5"> 
                            {filteredProducts.map((p) => (
                                <ProductCard key={p._id} product={p} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500 dark:text-gray-400 text-xl mt-16">
                            No products found matching your criteria.
                        </p>
                    )
                )}
            </div>
        </div>
    );
};

export default Shop;