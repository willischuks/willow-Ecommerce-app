// AuthContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode'; 

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [user, setUser] = useState(null); 
    const [isLoadingAuth, setIsLoadingAuth] = useState(true); // provide loading state

    // Function to check authentication status
    const checkAuthStatus = useCallback(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                // Check if token is expired
                if (decodedToken.exp * 1000 < Date.now()) {
                    console.log('Token expired. Logging out.');
                    logout(); // Clear token if expired
                } else {
                    setIsAuthenticated(true);
                    setUser(decodedToken);
                    setIsAdmin(decodedToken.role === 'admin');// Check if user is admin
                }
            } catch (error) {
                console.error('Error decoding or validating token:', error);
                logout(); // Clear token if it's invalid
            }
        } else {
            setIsAuthenticated(false);
            setIsAdmin(false);
            setUser(null);
        }
        setIsLoadingAuth(false);
    }, []); 

    useEffect(() => {
        checkAuthStatus();
    }, [checkAuthStatus]); 

    // Function to handle login
    const login = (token) => {
        localStorage.setItem('token', token);
        checkAuthStatus(); 
    };

    // Function to handle logout
    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setIsAdmin(false);
        setUser(null);
        setIsLoadingAuth(false); 
    };

    // Context value to be provided to components
    const authContextValue = {
        isAuthenticated,
        isAdmin,
        user,
        isLoadingAuth,
        login,
        logout,
    };
    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};
// Export the AuthContext
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};