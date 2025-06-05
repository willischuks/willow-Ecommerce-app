//App.jsx
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import ProtectedRoute from './components/protectedRoutes';
import Admin from './pages/Admin';
import EditProduct from './pages/EditProduct';
import DeleteProduct from './pages/DeleteProduct';
import CreateProduct from './pages/CreateProduct';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import CustomerLogin from './pages/CustomerLogin';
import CustomerRegister from './pages/CustomerRegister';
import SearchPage from './components/SearchPage';
import Cart from './pages/Cart';
import SuccessPage from './pages/Success';
import CancelPage from './pages/Cancel';
import Shop from './pages/Shop';
import FooterComponent from './components/Footer'; 
import AdminLogin  from './pages/AdminLogin';
import AdminRegister from './pages/AdminRegister';
import AdminNavbar from './components/AdminNavBar';
import ScrollToTop from './components/ScrollToTop'; 


function App (){
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith('/admin');

    return(
        <>
            <ScrollToTop />
            {isAdminRoute ? <AdminNavbar /> : <Navbar />}
            <Routes>
                <Route path = "/" element={<Home/>} />
                <Route path = "/home" element={<Home/>} />
                <Route path = "/login" element={<CustomerLogin/>} />
                <Route path = "/register" element={<CustomerRegister/>} />
                <Route path = "/shop" element={<Shop/>} />
                <Route path = "/admin-login" element={<AdminLogin />} />
                <Route path = "/admin-register" element={<AdminRegister/>} />
                <Route path = "/search" element={<SearchPage/>} />
                <Route path='/cart' element ={<Cart/>}/> 
                <Route path='/success' element={<SuccessPage/>}/>
                <Route path='/cancel' element={<CancelPage/>}/>
                <Route
                    path="/admin/*"
                    element={
                        <ProtectedRoute>
                            <AdminRoutes />
                        </ProtectedRoute>
                    }
                />
            </Routes>
            
            {!isAdminRoute && <FooterComponent/>} 
        </>
    )
};

const AdminRoutes = () => {
    return(
        <Routes>
            <Route path="/*" element={<Admin />} />
            <Route path="/product/create/" element={<CreateProduct />} />
            <Route path="/product/edit/:id" element={<EditProduct />} />
            <Route path="/product/delete/:id" element={<DeleteProduct />} />
        </Routes>
    )
};

export default App;