// protectedRoutes.jsx
import React  from "react";
import {Navigate, useLocation} from "react-router-dom";
import {useAuth} from "../context/AuthContext";


const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, isAdmin, isLoadingAuth } = useAuth(); // Get state from context
    const location = useLocation();
        
        if (isLoadingAuth) {
            return <div>Loading authentication...</div>; // Or a spinner/loading screen
        }

    const isAttemptingAdminRoute = location.pathname.startsWith('/admin');

    // Logic for Admin Routes
    if (isAttemptingAdminRoute) {
        if (!isAuthenticated || !isAdmin) {
            console.log('ProtectedRoute: Access denied to admin route. Redirecting to /admin-login.');
            // Redirect specifically to the admin login page
            return <Navigate to="/admin-login" replace state={{ from: location }} />;
        }
        return children;
    }
    return children; 
};

export default ProtectedRoute;
