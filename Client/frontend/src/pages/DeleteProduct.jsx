
//DeleteProduct.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { Button, Card } from 'flowbite-react';
import { HiArrowLeft, HiOutlineTrash } from 'react-icons/hi'; 

const DeleteProduct = () => {
    const [loading, setLoading] = useState(false); 
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

    const handleDeleteProduct = () => {
        setLoading(true);
        axios.delete(`${SERVER_BASE_URL}/products/${id}`, config)
            .then(() => {
                enqueueSnackbar("Product deleted successfully", { variant: "success" });
                navigate("/admin");
            })
            .catch((error) => {
                console.error("Error deleting product:", error);
                enqueueSnackbar(error.response?.data?.message || "Error deleting product", { variant: "error" });
            })
            .finally(() => {
                setLoading(false); 
            });
    };

    return (
        <div className='flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4'>
            {loading && <Spinner />} 
            <Card className='w-full max-w-md p-6 shadow-xl rounded-lg dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-center'>
                <div className="flex justify-between items-center mb-6">
                    <h1 className='text-3xl font-extrabold text-gray-900 dark:text-white'>Delete Product</h1>
                    <Link to='/admin'>
                        <Button color="alternative" pill size="sm">
                            <HiArrowLeft className="mr-2 h-4 w-4" />
                            Back
                        </Button>
                    </Link>
                </div>

                <h2 className='text-xl font-semibold my-6 text-gray-800 dark:text-gray-200'>
                    Are you sure you want to delete this product permanently?
                </h2>

                <div className="flex justify-center gap-4 mt-6">
                    <Button
                        onClick={handleDeleteProduct}
                        color="red" 
                        isProcessing={loading} 
                        disabled={loading} 
                        className="w-full sm:w-auto" 
                    >
                        <HiOutlineTrash className="mr-2 h-5 w-5" />
                        {loading ? "Deleting..." : "Yes, Delete It!"}
                    </Button>
                    <Link to="/admin">
                        <Button color="gray" className="w-full sm:w-auto"> 
                            No, Cancel
                        </Button>
                    </Link>
                </div>
            </Card>
        </div>
    );
};

export default DeleteProduct;