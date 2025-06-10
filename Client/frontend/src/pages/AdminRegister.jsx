// //AdminRegister.jsx
// "use client"; 
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom'; 
// import {
//     TextInput,
//     Button,
//     Label,
// } from 'flowbite-react';
// import { CiLock } from "react-icons/ci";
// import { IoMailOutline } from "react-icons/io5";



// const StyledLockIcon = (props) => {
//     return (
//         <CiLock
//             className="text-gray-500 dark:text-gray-400 text-base" 
//             {...props}
//         />
//     );
// };

// const StyledMailIcon = (props) => {
//     return (
//         <IoMailOutline 
//             className="text-blue-950 dark:text-black-400 text-xs" 
//             {...props}
//         />
//     );
// };

// const SERVER_BASE_URL = import.meta.env.VITE_REACT_APP_SERVER_BASE_URL;

// const AdminRegister= () => {

//     const navigate = useNavigate();

//     const [userData, setUserData] = useState({
//         email: '',
//         password: '',
//         password2: '', 
//         termsAccepted: false
//     });

//     const [statusMessage, setStatusMessage] = useState('');
//     const [isSuccess, setIsSuccess] = useState(false);
//     const [isLoading, setIsLoading] = useState(false); 

//     const changeInputHandler = (e) => {
//         const { name, value, type, checked } = e.target;
//         setUserData(prev => ({
//             ...prev,
//             [name]: type === 'checkbox' ? checked : value
//         }));
//         if (statusMessage) {
//             setStatusMessage('')
//             setIsSuccess(false);
//         };
//     };

//     const submitHandler = async (e) => {
//         e.preventDefault();
//         setStatusMessage('');
//         setIsSuccess(false);
//         setIsLoading(false); 

//         if (userData.password !== userData.password2) {
//             setStatusMessage('Passwords do not match.');
//             setIsSuccess(false);    
//             setIsLoading(false);
//             return;
//         }

//         try {
//             const response = await fetch(`${SERVER_BASE_URL}/auth/register`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     email: userData.email,
//                     password: userData.password
//                 })
//             });

//             const data = await response.json();

//             if (response.ok) {
//                 console.log('Registration successful:', data);
//                 navigate ('/admin');
//                 setUserData({ email: '', password: '', password2: '', termsAccepted: false });
//             } else {
//                 setStatusMessage(data.msg || 'Registration failed. Please try again.');
//                 setIsSuccess(false);
//             }
//         } catch (error) {
//             console.error('Registration error:', error);
//             setStatusMessage('An unexpected error occurred. Please try again later.');
//             setIsSuccess(false);
//         } finally{
//             setIsLoading(false);
//         }
//     };

//     return (
//         <div className='flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4'> 
//             <h2 className=' font-medium mb-4 text-gray-900 dark:text-white text-xl'>Register Account</h2>

//             {statusMessage && (
//                 <p className={`${isSuccess ? 'text-green-500' : 'text-red-500'} text-base italic mb-4 text-center`}>
//                     {statusMessage}
//                 </p>
//             )}
//             <form className="max-w-xs w-full p-4 bg-white rounded-lg shadow dark:bg-gray-800" onSubmit={submitHandler}>
//                 <div className="mb-5">
//                     <div className="mb-2 block">
//                         <Label htmlFor="email" value="Your email" />
//                     </div>
//                     <TextInput
//                         id="email"
//                         type="email"
//                         placeholder="name@company.com"
//                         name="email"
//                         value={userData.email}
//                         onChange={changeInputHandler}
//                         required
//                         icon ={ StyledMailIcon }
//                         sizing="sm" 
//                     />
//                 </div>
//                 <div className="mb-5">
//                     <div className="mb-2 block">
//                         <Label htmlFor="password" value="Your password" />
//                     </div>
//                     <TextInput
//                         id="password"
//                         type="password"
//                         name="password"
//                         placeholder="***********"
//                         value={userData.password}
//                         onChange={changeInputHandler}
//                         required
//                         sizing="sm" 
//                         icon= {StyledLockIcon }

//                     />
//                 </div>
//                 <div className="mb-5">
//                     <div className="mb-2 block">
//                         <Label htmlFor="password2" value="Repeat password" />
//                     </div>
//                     <TextInput
//                         id="password2"
//                         type="password"
//                         name="password2"
//                         placeholder="***********"
//                         value={userData.password2}
//                         onChange={changeInputHandler}
//                         required
//                         sizing="sm" 
//                         icon= {StyledLockIcon}
//                     />
//                 </div>

//                 <Button type="submit" color="blue" className="w-full">
//                     Register new account
//                 </Button>
//             </form>

//             <p className='mt-4 text-gray-700 dark:text-gray-300'>Existing/Created Account?</p>
//             <Link to="/admin-login" className='text-blue-600 hover:text-blue-800 text-xl font-medium'>Sign In</Link>
//         </div>
//     );
// };

// export default AdminRegister;


// AdminRegister.jsx
"use client";
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    TextInput,
    Button,
    Label,
} from 'flowbite-react';
import { CiLock } from "react-icons/ci";
import { IoMailOutline } from "react-icons/io5";

// ... (StyledLockIcon, StyledMailIcon, SERVER_BASE_URL) ...

const AdminRegister = () => {
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        email: '',
        password: '',
        password2: '',
        termsAccepted: false
    });

    const [statusMessage, setStatusMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const changeInputHandler = (e) => {
        const { name, value, type, checked } = e.target;
        setUserData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        if (statusMessage) {
            setStatusMessage('');
            setIsSuccess(false);
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setStatusMessage('');
        setIsSuccess(false);
        setIsLoading(true); // <--- CORRECTED: Set isLoading to true here

        if (userData.password !== userData.password2) {
            setStatusMessage('Passwords do not match.');
            setIsSuccess(false);
            setIsLoading(false); // <--- Set isLoading to false on validation failure
            return;
        }

        try {
            const response = await fetch(`${SERVER_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: userData.email,
                    password: userData.password
                })
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Registration successful:', data);
                setStatusMessage('Registration successful!');
                setIsSuccess(true);

                // --- CRITICAL ADDITION START ---
                if (data.token) { // Assuming your backend returns a token on successful registration
                    localStorage.setItem('token', data.token);
                    // If your backend also returns role information, store that too
                    // e.g., if (data.role) localStorage.setItem('userRole', data.role);
                    // Or, update your AuthContext directly if you have one
                    // useAuth().setAuthStatus(true, data.role === 'admin');
                } else {
                    // Handle case where token is not returned (e.g., direct to login)
                    console.warn("No token received after admin registration. Redirecting to login.");
                    navigate('/admin-login'); // Or just to /login if that's the generic login
                    setIsLoading(false); // Make sure isLoading is false here too
                    return; // Exit to prevent further navigation to /admin
                }
                // --- CRITICAL ADDITION END ---

                // Only navigate to /admin if token was successfully stored
                navigate('/admin');
                setUserData({ email: '', password: '', password2: '', termsAccepted: false });

            } else {
                setStatusMessage(data.msg || 'Registration failed. Please try again.');
                setIsSuccess(false);
            }
        } catch (error) {
            console.error('Registration error:', error);
            setStatusMessage('An unexpected error occurred. Please try again later.');
            setIsSuccess(false);
        } finally {
            setIsLoading(false); // Ensure isLoading is false when process finishes
        }
    };

    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4'>
            <h2 className=' font-medium mb-4 text-gray-900 dark:text-white text-xl'>Register Admin Account</h2> {/* Changed title for clarity */}

            {statusMessage && (
                <p className={`${isSuccess ? 'text-green-500' : 'text-red-500'} text-base italic mb-4 text-center`}>
                    {statusMessage}
                </p>
            )}
            <form className="max-w-xs w-full p-4 bg-white rounded-lg shadow dark:bg-gray-800" onSubmit={submitHandler}>
                {/* ... (email, password, password2 inputs) ... */}

                <Button
                    type="submit"
                    color="blue"
                    className="w-full"
                    disabled={isLoading} // Disable button while loading
                >
                    {isLoading ? 'Registering...' : 'Register new account'} {/* Show loading state */}
                </Button>
            </form>

            <p className='mt-4 text-gray-700 dark:text-gray-300'>Existing/Created Account?</p>
            <Link to="/admin-login" className='text-blue-600 hover:text-blue-800 text-xl font-medium'>Sign In</Link>
        </div>
    );
};

export default AdminRegister;