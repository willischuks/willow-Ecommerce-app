// EditProduct.jsx
import React, { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Button, Label, TextInput, Textarea, Select, Card } from 'flowbite-react';
import { HiArrowLeft } from 'react-icons/hi'; 

const EditProduct = () => {
    const [name, setName] = useState('');
    const [priceInCents, setPriceInCents] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(false);
    const [condition, setCondition] = useState('');
    const [posterSize, setPosterSize] = useState('');
    const [isActive, setIsActive] = useState(true); 

    const navigate = useNavigate();
    const { id } = useParams();
    const { enqueueSnackbar } = useSnackbar();

    const SERVER_BASE_URL = import.meta.env.VITE_REACT_APP_SERVER_BASE_URL;

    const token = localStorage.getItem('token');
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };

    useEffect(() => {
        setLoading(true);
        axios.get(`${SERVER_BASE_URL}/products/${id}`)
            .then((res) => {
                setName(res.data.name || '');
                setPriceInCents(res.data.priceInCents || '');
                setDescription(res.data.description || '');
                setCategory(res.data.category || '');
                setCondition(res.data.condition || ''); 
                setPosterSize(res.data.posterSize || ''); 
                setIsActive(res.data.isActive !== undefined ? res.data.isActive : true); 
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching product:", err);
                enqueueSnackbar(err.response?.data?.message || 'Error fetching product details', { variant: 'error' });
                setLoading(false);
                navigate('/admin'); 
            });
    }, [id, enqueueSnackbar, navigate, SERVER_BASE_URL]);

    const handleEditProduct = () => {
        const data = {
            name,
            priceInCents: Number(priceInCents), 
            description,
            category,
            condition,
            posterSize,
            isActive
        };

        if (!name || !priceInCents || !category || !condition || !posterSize ||isActive === undefined) {
            enqueueSnackbar('Please fill in all required fields (Name, Price, Category, Condition, PosterSize)', { variant: 'warning' });
            return;
        }

        setLoading(true);
        axios.put(`${SERVER_BASE_URL}/products/${id}`, data, config)
            .then(() => {
                setLoading(false);
                enqueueSnackbar('Product updated successfully', { variant: 'success' });
                navigate('/admin'); 
            })
            .catch((err) => {
                setLoading(false);
                console.error("Error updating product:", err);
                enqueueSnackbar(err.response?.data?.message || 'Error updating product', { variant: 'error' });
            });
    };

    return (
        <div className='flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4'>
            {loading ? (
                <Spinner />
            ) : (
                <Card className="w-full max-w-xl p-6 shadow-xl rounded-lg dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className='text-3xl font-extrabold text-gray-900 dark:text-white'>Edit Product</h1>
                        <Link to='/admin'>
                            <Button color="alternative" pill size="sm">
                                <HiArrowLeft className="mr-2 h-4 w-4" />
                                Back
                            </Button>
                        </Link>
                    </div>
                    <form className="flex flex-col gap-4">
                        {/* Product name */}
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="name" value="Product Name" className="text-gray-700 dark:text-gray-300" />
                            </div>
                            <TextInput
                                id="name"
                                type="text"
                                placeholder="Enter product name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        {/* Price In Cents */}
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="priceInCents" value="Price (in Cents)" className="text-gray-700 dark:text-gray-300" />
                            </div>
                            <TextInput
                                id="priceInCents"
                                type="number"
                                placeholder="e.g., 10000 for $100.00"
                                value={priceInCents}
                                onChange={(e) => setPriceInCents(e.target.value)}
                                min="0"
                                required
                            />
                        </div>
                        {/* Description */}
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="description" value="Description" className="text-gray-700 dark:text-gray-300" />
                            </div>
                            <Textarea
                                id="description"
                                placeholder="Enter product description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={4}
                            />
                        </div>
                        {/* Category */}
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="category" value="Category" className="text-gray-700 dark:text-gray-300" />
                            </div>
                            <Select
                                id="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                required
                            >
                                <option value="" disabled>Select Category</option>
                                                            <option value="" disabled>Select Category</option>
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
                         {/* Poster Size */}
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="posterSize" value="Poster Size" className="text-gray-700 dark:text-gray-200" />
                            </div>
                            <Select
                                id='posterSize'
                                value={posterSize}
                                onChange={(e) => setPosterSize(e.target.value)}
                                required
                                sizing="sm"
                                className="w-full"
                                color="gray"
                            >
                                <option value="" disabled>Select Size</option>
                                <option value="27x40 inch">27x40 inch</option>
                                <option value="11x17 inch">11x17 inch</option>
                                <option value="Custom">Custom</option>
                                
                            </Select>
                        </div>
                        {/* Condition */}
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="condition" value="Condition" className="text-gray-700 dark:text-gray-200" />
                            </div>
                            <Select
                                id='condition'
                                value={condition}
                                onChange={(e) => setCondition(e.target.value)}
                                required
                                sizing="sm"
                                className="w-full"
                                color="gray"
                            >
                                <option value="" disabled>Select Condition</option>
                                <option value="Mint">Mint</option>
                                <option value="Near Mint">Near Mint</option>
                                <option value="Fine">Fine</option>
                                <option value="Very Good">Very Good</option>
                                <option value="Good">Good</option>
                                <option value="Fair">Fair</option>
                                <option value="Poor">Poor</option>
                            </Select>
                        </div>
                        {/* Is Active Checkbox */}
                        <div className="flex items-center gap-2 mb-4 md:col-span-1">
                            <input
                                id="isActive"
                                type="checkbox"
                                checked={isActive}
                                onChange={(e) => setIsActive(e.target.checked)}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <Label htmlFor="isActive" className="text-gray-700 dark:text-gray-200">Is Active?</Label>
                        </div>
                        <Button
                            onClick={handleEditProduct}
                            color="blue"
                            isProcessing={loading} 
                            disabled={loading}
                            className="mt-4 w-full"
                        >
                            {loading ? 'Saving Changes...' : 'Save Changes'}
                        </Button>
                    </form>
                </Card>
            )}
        </div>
    );
};

export default EditProduct;