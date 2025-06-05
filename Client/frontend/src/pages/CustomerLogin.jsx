// CustomerLogin.jsx
"use client";
import React, { useState } from 'react';
import { Button, Label, TextInput, Card, Alert } from 'flowbite-react';
import { HiInformationCircle } from 'react-icons/hi';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


function CustomerLogin () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_REACT_APP_SERVER_BASE_URL}/customers/login`,
                { email, password }
            );

            const { token, customer } = response.data; 

            enqueueSnackbar('Customer login successful!', { variant: 'success' });
            navigate('/');
        } catch (err) {
            console.error('Customer login error:', err);
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
            enqueueSnackbar(err.response?.data?.message || 'Login failed', { variant: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-100px)] bg-gray-50 dark:bg-gray-900 py-6"> 
            <Card className="w-full max-w-xs p-5 bg-white rounded-lg shadow-md dark:bg-gray-800"> 
                <h2 className="text-xl font-bold text-center text-gray-900 dark:text-white mb-5">Login</h2> 
                <form onSubmit={handleSubmit} className="flex flex-col gap-3"> 
                    {error && (
                        <Alert color="failure" icon={HiInformationCircle} className="text-sm p-2"> 
                            <span>{error}</span>
                        </Alert>
                    )}
                    <div>
                        <div className="mb-1 block"> 
                            <Label htmlFor="email" value="Your email" className="text-sm" /> 
                        </div>
                        <TextInput
                            id="email"
                            type="email"
                            placeholder="name@example.com"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            sizing="xs" 
                        />
                    </div>
                    <div>
                        <div className="mb-1 block">
                            <Label htmlFor="password" value="Your password" className="text-sm" /> 
                        </div>
                        <TextInput
                            id="password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            sizing="xs" 
                        />
                    </div>
                    <Button type="submit" disabled={loading} size="sm"> 
                        {loading ? 'Logging in...' : 'Login'}
                    </Button>
                    <div className="text-xs text-center text-gray-500 dark:text-gray-400 mt-2"> 
                        Not registered yet?{' '}
                        <Link to="/register" className="font-medium text-blue-600 hover:underline dark:text-blue-500">
                            Create an account
                        </Link>
                    </div>
                </form>
            </Card>
        </div>
    );
}

export default CustomerLogin;