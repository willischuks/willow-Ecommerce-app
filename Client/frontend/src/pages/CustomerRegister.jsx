// CustomerRegister.jsx
"use client";
import React, { useState } from 'react';
import { Button, Label, TextInput, Card, Alert } from 'flowbite-react';
import { HiInformationCircle } from 'react-icons/hi';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


const CustomerRegister = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); 
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); 
        setLoading(true);

        if (password !== confirmPassword) {
            setError('Passwords do not match. Please ensure both fields are identical.');
            enqueueSnackbar('Passwords do not match', { variant: 'error' });
            setLoading(false);
            return;
        }

        if (password.length < 6) { 
            setError('Password must be at least 6 characters long.');
            enqueueSnackbar('Password too short', { variant: 'error' });
            setLoading(false);
            return;
        }

        try{
            const response = await axios.post(
                `${import.meta.env.VITE_REACT_APP_SERVER_BASE_URL}/customers/register`,
                { name, email, password } 
            );

            enqueueSnackbar('Registration successful! Please login.', { variant: 'success' });
            navigate('/'); 
        } catch (err) {
            console.error('Customer registration error:', err);
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
            enqueueSnackbar(err.response?.data?.message || 'Registration failed', { variant: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 py-6"> 
            <Card className="w-full max-w-xs p-3 bg-white rounded-lg shadow-md dark:bg-gray-800 mt-10"> 
                <h2 className="text-xl font-bold text-center text-gray-900 dark:text-white mb-2">Create Account</h2> 
                <form onSubmit={handleSubmit} className="flex flex-col gap-3"> 
                    {error && (
                        <Alert color="failure" icon={HiInformationCircle} className="text-sm p-2"> 
                            <span>{error}</span>
                        </Alert>
                    )}
                    <div>
                        <div className="mb-1 block"> 
                            <Label htmlFor="name" value="Your Name" className="text-sm" /> 
                        </div>
                        <TextInput
                            id="name"
                            type="text"
                            placeholder="John Doe"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            sizing="sm" 
                        />
                    </div>
                    <div>
                        <div className="mb-1 block"> 
                            <Label htmlFor="email" value="Your Email" className="text-sm" /> 
                        </div>
                        <TextInput
                            id="email"
                            type="email"
                            placeholder="name@example.com"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            sizing="sm" 
                        />
                    </div>
                    <div>
                        <div className="mb-1 block"> 
                            <Label htmlFor="password" value="Password" className="text-sm" /> 
                        </div>
                        <TextInput
                            id="password"
                            type="password"
                            placeholder="***********"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            sizing="sm" 
                        />
                    </div>
                    <div>
                        <div className="mb-1 block"> 
                            <Label htmlFor="confirm-password" value="Confirm Password" className="text-sm" /> 
                        </div>
                        <TextInput
                            id="confirm-password"
                            type="password"
                            placeholder='***********'
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            sizing="sm"
                        />
                    </div>
                    <Button type="submit" disabled={loading} size="sm"> 
                        {loading ? 'Registering...' : 'Register Account'}
                    </Button>
                    <div className="text-xs text-center text-gray-500 dark:text-gray-400 mt-2"> 
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-blue-600 hover:underline dark:text-blue-500">
                            Login here
                        </Link>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default CustomerRegister;