
// CreateProduct.jsx
"use client"; 
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import {
    Button,
    Card,
    Label,
    TextInput,
    Select,
    FileInput,
} from 'flowbite-react';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import Spinner from '../components/Spinner'; 


const CreateProduct = () => {
    const [name, setName] = useState('');
    const [priceInCents, setPriceInCents] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null); 
    const [imgPreview, setImgPreview] = useState(null);
    const [loading, setLoading] = useState(false); 
    const [uploadingImage, setUploadingImage] = useState(false); 
    const [movieTitle, setMovieTitle] = useState('');
    const [releaseYear, setReleaseYear] = useState('');
    const [director, setDirector] = useState('');
    const [actors, setActors] = useState(''); 
    const [posterSize, setPosterSize] = useState('');
    const [condition, setCondition] = useState('');
    const [isActive, setIsActive] = useState(true); 

    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setImage(selectedFile);
        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImgPreview(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        } else {
            setImgPreview(null);
        }
    };

    const uploadFile = async () => {
        if (!image) {
            enqueueSnackbar('Please select an image', { variant: 'warning' });
            return null; 
        }

        setUploadingImage(true); 
        const data = new FormData();
        data.append('file', image);

        try {
            const upLoadUrl = `${import.meta.env.VITE_REACT_APP_SERVER_BASE_URL}/upload-image`;
            const res = await axios.post(upLoadUrl, data);
            const { secure_url } = res.data;

            enqueueSnackbar('Image uploaded successfully', { variant: 'success' });
            return secure_url;
        } catch (error) {
            console.error('Error uploading image:', error);
            enqueueSnackbar('Error uploading image: ' + (error.response?.data?.message || error.message), { variant: 'error' });
            return null; 
        } finally {
            setUploadingImage(false); 
        }
    };

    const handleSaveProduct = async () => {
        if (!name || !priceInCents || !description || !category || !image || !movieTitle ||
            !releaseYear || !director || !actors || !posterSize || !condition ) {
            enqueueSnackbar('Please fill in all required fields and select an image', { variant: 'warning' });
            return;
        }

        const price = Number(priceInCents);
        if (isNaN(price) || price < 0) {
            enqueueSnackbar('Price must be a valid non-negative number', { variant: 'warning' });
            return;
        }


        const year = Number(releaseYear);
        if (isNaN(year) || year < 1888 || year > new Date().getFullYear() + 5) { 
            enqueueSnackbar('Release Year must be a valid year', { variant: 'warning' });
            return;
        }


        setLoading(true);
        let uploadedImageUrl = null;

        try {
            uploadedImageUrl = await uploadFile();
            if (!uploadedImageUrl) {
                setLoading(false);
                return;
            }

            console.log('Image uploaded:', uploadedImageUrl);

            const data = {
                name,
                priceInCents: price,
                description,
                category,
                imageUrl: uploadedImageUrl,
                movieTitle,
                releaseYear: year, 
                director,
                actors: actors.split(',').map(actor => actor.trim()).filter(actor => actor), 
                posterSize,
            };

            await axios.post(`${import.meta.env.VITE_REACT_APP_SERVER_BASE_URL}/products`, data, config);
            enqueueSnackbar('Product created successfully', { variant: 'success' });
            navigate('/admin/products');
        } catch (error) {
            console.error('Error creating product:', error.response ? error.response.data : error.message);
            enqueueSnackbar('Error creating product: ' + (error.response?.data?.message || 'An unexpected error occurred.'), { variant: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='p-6 bg-gray-50 dark:bg-gray-900 min-h-screen flex justify-center items-center'>
            {loading && <Spinner />} 

            <Card className="max-w-xl w-full p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg"> 
                <div className="flex items-center justify-between mb-6">

                    <Link to='/admin/products'>
                        <Button color="gray" size="sm" className="w-12 h-fit">
                            <HiOutlineArrowLeft className="text-lg" />
                        </Button>
                    </Link>
                    <h1 className='text-3xl font-semibold text-gray-800 dark:text-white'>Create Product</h1>
                    <div className="w-12"></div>
                </div>

                <form className="grid grid-cols-1 md:grid-cols-2 gap-4"> 
                    {/* Product Name */}
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="name" value="Product Name" className="text-gray-700 dark:text-gray-200" />
                        </div>
                        <TextInput
                            id='name'
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder='Enter product name'
                            required
                            sizing="sm"
                            className="w-full"
                            color="gray"
                        />
                    </div>

                    {/* Price In Cents */}
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="priceInCents" value="Price In Cents" className="text-gray-700 dark:text-gray-200" />
                        </div>
                        <TextInput
                            id='priceInCents'
                            type="number"
                            value={priceInCents}
                            onChange={(e) => setPriceInCents(e.target.value)}
                            placeholder="e.g., 10000 for $100.00"
                            min="0"
                            required
                            sizing="sm"
                            className="w-full"
                            color="gray"
                        />
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2">
                        <div className="mb-2 block">
                            <Label htmlFor="description" value="Description" className="text-gray-700 dark:text-gray-200" />
                        </div>
                        <TextInput
                            id='description'
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder='Brief Description Of The Poster....'
                            required
                            sizing="sm"
                            className="w-full"
                            color="gray"
                        />
                    </div>

                    {/* Movie Title */}
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="movieTitle" value="Movie Title" className="text-gray-700 dark:text-gray-200" />
                        </div>
                        <TextInput
                            id='movieTitle'
                            type="text"
                            value={movieTitle}
                            onChange={(e) => setMovieTitle(e.target.value)}
                            placeholder='Movie Title'
                            required
                            sizing="sm"
                            className="w-full"
                            color="gray"
                        />
                    </div>

                    {/* Release Year */}
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="releaseYear" value="Release Year" className="text-gray-700 dark:text-gray-200" />
                        </div>
                        <TextInput
                            id='releaseYear'
                            type="number"
                            value={releaseYear}
                            onChange={(e) => setReleaseYear(e.target.value)}
                            placeholder='Realease Year (e.g., 1977)'
                            min="1888" 
                            max={new Date().getFullYear() + 5} 
                            required
                            sizing="sm"
                            className="w-full"
                            color="gray"
                        />
                    </div>

                    {/* Director */}
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="director" value="Director" className="text-gray-700 dark:text-gray-200" />
                        </div>
                        <TextInput
                            id='director'
                            type="text"
                            value={director}
                            onChange={(e) => setDirector(e.target.value)}
                            placeholder='Director Name'
                            required
                            sizing="sm"
                            className="w-full"
                            color="gray"
                        />
                    </div>

                    {/* Actors */}
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="actors" value="Actors (comma-separated)" className="text-gray-700 dark:text-gray-200" />
                        </div>
                        <TextInput
                            id='actors'
                            type="text"
                            value={actors}
                            onChange={(e) => setActors(e.target.value)}
                            placeholder='Actors...'
                            required
                            sizing="sm"
                            className="w-full"
                            color="gray"
                        />
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
                    {/* Category */}
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="category" value="Category (Genre)" className="text-gray-700 dark:text-gray-200" />
                        </div>
                        <Select
                            id='category'
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                            sizing="sm"
                            className="w-full"
                            color="gray"
                        >
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
                    <div className="md:col-span-2">
                        <div className="mb-2 block">
                            <Label htmlFor="image" value="Upload Product Image" className="text-gray-700 dark:text-gray-200" />
                        </div>
                        <FileInput
                            id='image'
                            accept='image/*'
                            onChange={handleFileChange}
                            required
                            sizing="sm"
                            color="gray"
                        />

                        {imgPreview && (
                            <div className='w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-md mt-4 flex items-center justify-center overflow-hidden'>
                                <img src={imgPreview} alt="Image Preview" className='w-full h-full object-contain rounded-md' />
                            </div>
                        )}
                    </div>
                    {/* Button */}
                    <div className="md:col-span-2">
                        <Button
                            onClick={handleSaveProduct}
                            type="submit"
                            className="mt-4 w-full"
                            disabled={loading || uploadingImage}
                            color="blue"
                            
                        >
                            {(loading || uploadingImage) ? 'Processing...' : 'Save Product'}
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default CreateProduct;
