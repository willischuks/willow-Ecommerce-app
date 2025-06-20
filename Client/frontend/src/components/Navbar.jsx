// Navbar.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from 'flowbite-react';
import CartIcon from './CartIcon';

const Navbar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/search?query=${searchTerm}`);
            setSearchTerm('');
            setIsMobileMenuOpen(false); 
        }
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 py-1 fixed w-full top-0 z-50">
            <div className="max-w-screen-xl flex items-center justify-between mx-auto px-4">
                <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse">
                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white font-heading font-willow">Willow.</span>
                </Link>
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-main-desktop-links">
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg dark:bg-gray-800 dark:border-gray-700 bg-gray-50 md:space-x-4 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white ">
                        <li>
                            <Link to="/" className="block py-2 px-3 text-gray-900 rounded-md hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Home</Link>
                        </li>
                        <li>
                            <Link to="/shop" className="block py-2 px-3 text-gray-900 rounded-md hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Shop</Link>
                        </li>
                    </ul>
                </div>

                {/* Right-hand side elements */}
                <div className="flex md:order-2 items-center space-x-2">
                    {/* Desktop Search Form - Hidden on small screens */}
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

                    {/* CUSTOMER LOGIN BUTTON - Always visible where it is, on both desktop and mobile */}
                    <Link to="/login">
                        <Button className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white hover:bg-gradient-to-br focus:ring-blue-300 dark:focus:ring-blue-800">
                            Login
                        </Button>
                    </Link>

                    <CartIcon />

                    {/* Mobile Menu Button - Hamburger or Close Icon */}
                    <button
                        onClick={toggleMobileMenu}
                        type="button"
                        className="inline-flex items-center p-2 w-8 h-8 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-search"
                        aria-expanded={isMobileMenuOpen ? "true" : "false"}
                    >
                        <span className="sr-only">Open main menu</span>
                        {isMobileMenuOpen ? (
                            // Close icon when menu is open
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            // Hamburger icon when menu is closed
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                            </svg>
                        )}
                    </button>
                </div>
                {/* Mobile Menu Content (Hamburger Display) */}
                <div className={`${isMobileMenuOpen ? '' : 'hidden'} items-center justify-between w-full md:hidden`} id="navbar-search">
                    <div className="relative mt-3">
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
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg dark:bg-gray-800 dark:border-gray-700 bg-gray-50">
                        <li>
                            <Link to="/" onClick={toggleMobileMenu} className="block py-2 px-3 text-gray-900 rounded-md hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Home</Link>
                        </li>
                        <li>
                            <Link to="/shop" onClick={toggleMobileMenu} className="block py-2 px-3 text-gray-900 rounded-md hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Shop</Link>
                        </li>
                        {/* Login and Register are intended to be only in the mobile menu's list */}
                        <li>
                            <Link to="/login" onClick={toggleMobileMenu} className="block py-2 px-3 text-gray-900 rounded-md hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Login</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;