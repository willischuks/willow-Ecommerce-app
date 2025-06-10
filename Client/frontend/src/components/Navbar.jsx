// // Navbar.jsx
// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { Button } from 'flowbite-react'; 

// import CartIcon from './CartIcon'; 

// const Navbar = () => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const navigate = useNavigate();
//     const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 


//     const handleSearchChange = (event) => {
//         setSearchTerm(event.target.value);
//     };

//     const handleSearchSubmit = (event) => {
//         event.preventDefault();
//         if (searchTerm.trim()) {
//             navigate(`/search?query=${searchTerm}`);
//             setSearchTerm(''); 
//         }
//     };

//     const toggleMobileMenu = () => {
//         setIsMobileMenuOpen(!isMobileMenuOpen);
//     };

//     return (
//         <nav className="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 py-1 fixed w-full top-0 z-50">
//             <div className="max-w-screen-xl flex items-center justify-between mx-auto px-4">
//                 <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse">
//                     <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white font-heading font-willow">Willow.</span>
//                 </Link>
//                 <div className="flex md:order-2 items-center space-x-2">
//                     {/* Desktop Search Form */}
//                     <form onSubmit={handleSearchSubmit} className="hidden md:block">
//                         <div className="relative">
//                             <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
//                                 <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
//                                     <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
//                                 </svg>
//                                 <span className="sr-only">Search icon</span>
//                             </div>
//                             <input
//                                 type="text"
//                                 id="search-navbar"
//                                 className="block w-full p-1.5 ps-10 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                                 placeholder="Search..."
//                                 value={searchTerm}
//                                 onChange={handleSearchChange}
//                             />
//                         </div>
//                     </form>
//                     <div className="flex items-center space-x-2">
//                         {/* CUSTOMER LOGIN BUTTON */}
//                         <Link to="/login"> 
//                             <Button className=" bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white hover:bg-gradient-to-br focus:ring-blue-300 dark:focus:ring-blue-800">
//                                 Login
//                             </Button>
//                         </Link>
                        
//                         <CartIcon />
//                         {/* Mobile Menu Button */}
//                         <button onClick={toggleMobileMenu} type="button" className="inline-flex items-center p-2 w-8 h-8 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-search" aria-expanded="false">
//                             <span className="sr-only">Open main menu</span>
//                             <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
//                                 <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
//                             </svg>
//                         </button>
//                     </div>
//                 </div>
//                 {/* Mobile Menu */}
//                 <div className={`${isMobileMenuOpen ? '' : 'hidden'} items-center justify-between w-full md:flex md:w-auto md:order-1`} id="navbar-search">
//                     <div className="relative mt-3 md:hidden">
//                         <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
//                             <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
//                                 <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
//                             </svg>
//                         </div>
//                         <form onSubmit={handleSearchSubmit}>
//                             <input
//                                 type="text"
//                                 id="search-navbar-mobile"
//                                 className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                                 placeholder="Search..."
//                                 value={searchTerm}
//                                 onChange={handleSearchChange}
//                             />
//                         </form>
//                     </div>
//                     <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg dark:bg-gray-800 dark:border-gray-700 bg-gray-50 md:space-x-4 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white ">
//                         <li>
//                             <Link to="/" onClick={toggleMobileMenu} className="block py-2 px-3 text-gray-900 rounded-md hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Home</Link>
//                         </li>
//                         <li>
//                             <Link to="/shop" onClick={toggleMobileMenu} className="block py-2 px-3 text-gray-900 rounded-md hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Shop</Link>
//                         </li>
//                         {isMobileMenuOpen && (
//                             <>
//                                 <li>
//                                     <Link to="/login" onClick={toggleMobileMenu} className="block py-2 px-3 text-gray-900 rounded-md hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Login</Link>
//                                 </li>
//                                 <li>
//                                     <Link to="/register" onClick={toggleMobileMenu} className="block py-2 px-3 text-gray-900 rounded-md hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Register</Link>
//                                 </li>
//                             </>
//                         )}
//                     </ul>
//                 </div>
//             </div>
//         </nav>
//     );
// };

// export default Navbar;



// Navbar.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from 'flowbite-react'; 
import CartIcon from './CartIcon'; 
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 
    const { isAuthenticated, user, logout } = useAuth(); // <-- Get isAuthenticated and logout from context

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/search?query=${searchTerm}`);
            setSearchTerm(''); 
        }
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleLogout = () => {
        logout(); // Call the logout function from AuthContext
        navigate('/'); // Redirect to home page after logout
        toggleMobileMenu(); // Close mobile menu if open
    };

    return (
        <nav className="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 py-1 fixed w-full top-0 z-50">
            <div className="max-w-screen-xl flex items-center justify-between mx-auto px-4">
                <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse">
                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white font-heading font-willow">Willow.</span>
                </Link>
                <div className="flex md:order-2 items-center space-x-2">
                    {/* Desktop Search Form */}
                    <form onSubmit={handleSearchSubmit} className="hidden md:block">
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                                <span className="sr-only">Search icon</span>
                            </div>
                            <input
                                type="text"
                                id="search-navbar"
                                className="block w-full p-1.5 ps-10 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                        </div>
                    </form>
                    <div className="flex items-center space-x-2">
                        {/* Conditional Rendering for Desktop Login/Logout/Profile */}
                        {isAuthenticated ? (
                            <>
                                {/* Optional: Link to User Profile/Dashboard if you have one */}
                                {/* <Link to="/profile">
                                    <Button className="bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
                                        Hello, {user?.email || 'User'}!
                                    </Button>
                                </Link> 
                                */}
                                <Button
                                    onClick={handleLogout}
                                    className="bg-red-500 text-white hover:bg-red-600 focus:ring-red-300 dark:focus:ring-red-800"
                                >
                                    Logout
                                </Button>
                            </>
                        ) : (
                            // Show Login button if not authenticated
                            <Link to="/login"> 
                                <Button className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white hover:bg-gradient-to-br focus:ring-blue-300 dark:focus:ring-blue-800">
                                    Login
                                </Button>
                            </Link>
                        )}
                        
                        <CartIcon />
                        {/* Mobile Menu Button */}
                        <button onClick={toggleMobileMenu} type="button" className="inline-flex items-center p-2 w-8 h-8 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-search" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                            </svg>
                        </button>
                    </div>
                </div>
                {/* Mobile Menu */}
                <div className={`${isMobileMenuOpen ? '' : 'hidden'} items-center justify-between w-full md:flex md:w-auto md:order-1`} id="navbar-search">
                    <div className="relative mt-3 md:hidden">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <form onSubmit={handleSearchSubmit}>
                            <input
                                type="text"
                                id="search-navbar-mobile"
                                className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                        </form>
                    </div>
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg dark:bg-gray-800 dark:border-gray-700 bg-gray-50 md:space-x-4 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white ">
                        <li>
                            <Link to="/" onClick={toggleMobileMenu} className="block py-2 px-3 text-gray-900 rounded-md hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Home</Link>
                        </li>
                        <li>
                            <Link to="/shop" onClick={toggleMobileMenu} className="block py-2 px-3 text-gray-900 rounded-md hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Shop</Link>
                        </li>
                        {/* Conditional Rendering for Mobile Login/Register/Logout */}
                        {isAuthenticated ? (
                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left py-2 px-3 text-gray-900 rounded-md hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                >
                                    Logout
                                </button>
                            </li>
                        ) : (
                            <>
                                <li>
                                    <Link to="/login" onClick={toggleMobileMenu} className="block py-2 px-3 text-gray-900 rounded-md hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Login</Link>
                                </li>
                                <li>
                                    <Link to="/register" onClick={toggleMobileMenu} className="block py-2 px-3 text-gray-900 rounded-md hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Register</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;