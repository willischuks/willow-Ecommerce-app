//AdminLogin.jsx
"use client"; 
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"; 
import {
    TextInput,
    Button,
    Label,
} from 'flowbite-react';
import { CiLock } from "react-icons/ci"; 
import { IoMailOutline } from "react-icons/io5"; 


const StyledLockIcon = (props) => {
    return (
        <CiLock
            className="text-gray-500 dark:text-gray-400 text-sm"
            {...props}
        />
    );
};

const StyledMailIcon = (props) => {
    return (
        <IoMailOutline
            className="text-gray-500 dark:text-gray-400 text-sm" 
            {...props}
        />
    );
};



const SERVER_BASE_URL = import.meta.env.VITE_REACT_APP_SERVER_BASE_URL;

const AdminLogin = () => {
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    const [statusMessage, setStatusMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false); 

    const changeInputHandler = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
        if (statusMessage) setStatusMessage('');
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setStatusMessage(''); 
        setIsLoading(true); 
        try {
            console.log('Sending login data:', loginData); 
            const response = await axios.post(
                `${SERVER_BASE_URL}/auth/login`, 
                loginData
            );

            console.log(response.data);
            localStorage.setItem('token', response.data.token);

            navigate('/admin'); 
            setLoginData({ email: '', password: '' }); 

        } catch (error) {
            console.error('Login error:', error);

            if (error.response) {
                
                setStatusMessage(error.response.data.msg || 'Login failed. Please check your credentials.');
            } else if (error.request) {
                
                setStatusMessage('Network error: Could not connect to the server. Please check your internet connection.');
            } else {
                
                setStatusMessage('An unexpected error occurred. Please try again.');
            }
        } finally {
            setIsLoading(false); 
        }
    };

    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4'>
            <h2 className='font-medium mb-4 text-gray-900 dark:text-white text-sm mt-16'>Admin Log In</h2>

            {/* Status Message Display */}
            {statusMessage && (
                <p className='text-red-500 text-base italic mb-4 text-center'>
                    {statusMessage}
                </p>
            )}

            <form className="max-w-xs w-full p-4 rounded-lg shadow dark:bg-gray-800" onSubmit={submitHandler}>
                {/* Email Input */}
                <div className="mb-5">
                    <div className="mb-2 block ">
                        <Label htmlFor="email" value="Your email" />
                    </div>
                    <TextInput
                        id="email"
                        type="email"
                        placeholder="name@company.com" 
                        name="email"
                        value={loginData.email}
                        onChange={changeInputHandler}
                        required
                        icon={StyledMailIcon} 
                        sizing="sm"
                    />
                </div>

                {/* Password Input */}
                <div className="mb-5">
                    <div className="mb-2 block">
                        <Label htmlFor="password" value="Your password" />
                    </div>
                    <TextInput
                        id="password"
                        type="password"
                        placeholder="***********" 
                        name="password"
                        value={loginData.password}
                        onChange={changeInputHandler}
                        required
                        sizing="sm" 
                        icon={StyledLockIcon} 
                    />
                </div>

                {/* Submit Button */}
                <Button
                    type='submit'
                    color="blue" 
                    className="w-full"
                    disabled={isLoading} 
                >
                    {isLoading ? 'Logging In...' : 'Log In'} 
                </Button>
            </form>

            <p className='mt-4 text-gray-700 dark:text-gray-300'>No account yet?</p>
            <Link
                to="/admin-register"
                className='text-blue-600 hover:text-blue-800 text-xl font-medium transition duration-300 ease-in-out'
            >
                Register
            </Link>
        </div>
    );
}

export default AdminLogin;