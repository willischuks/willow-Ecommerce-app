// AdminNavBar.jsx
"use client"; 
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    Navbar as FlowbiteNavbar,
    NavbarBrand,
    Button
} from 'flowbite-react';
import ThemeToggleButton from './ThemeToggleButton'; 

const AdminNavbar = () => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('token');
        navigate("/"); 
    }

    return (
        <FlowbiteNavbar
            fluid={false}
            className="border-b bg-gray-900 dark:bg-gray-950  py-2.5 max-w-screen-xl mx-auto px-4 shadow-sm"
        >
            {/* Logo/Brand Name */}
            <NavbarBrand as={Link} to="/admin" className="flex items-center space-x-2 rtl:space-x-reverse">
                <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white font-heading font-willow">Admin Panel</span>
            </NavbarBrand>
            {/* LogOut Button */}
            <div className="flex items-center gap-4">
                <Button
                    onClick={logout}
                    size="xs" 
                    className="font-medium  bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600" 
                >
                    Logout
                </Button>

                {/* Theme Toggle Button */}
                <ThemeToggleButton />
            </div>
        </FlowbiteNavbar>
    );
};

export default AdminNavbar;