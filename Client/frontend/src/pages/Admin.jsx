// //Admin.jsx
// import React, { useEffect, useState } from 'react';
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Button } from "flowbite-react";
// import Spinner from '../components/Spinner';
// import Stats from '../components/Stats';



// const Admin = () => {
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         setLoading(true);
//         axios
//             .get(`${import.meta.env.VITE_REACT_APP_SERVER_BASE_URL}/products`)
//             .then((response) => {
//                 const { products: fetchedProducts } = response.data;
//                 console.log("API Response (Admin page):", response.data);
//                 setProducts(fetchedProducts);
//                 setLoading(false);
//             })
//             .catch((error) => {
//                 console.error("Error fetching products:", error);
//                 setLoading(false);
                
//             });
//     }, []);

//     return (
//         <div className='container max-w-screen-xl px-4 py-8 md:px-8 lg:px-12 bg-gray-900 dark:bg-gray-800 '>
//             <h1 className='text-4xl font-extrabold text-center mb-10 text-gray-900 dark:text-white sm:text-5xl'>
//                 Admin Dashboard
//             </h1>

//             <Stats />

//             <div className="flex flex-col sm:flex-row justify-between items-center mb-8 mt-12 gap-4">
//                 <h2 className='text-3xl font-semibold text-gray-800 dark:text-gray-100'>Product Listings</h2>
//                 <Link
//                     to="/admin/product/create"
//                     className='inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-green-500 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition ease-in-out duration-150'
//                 >
//                     <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                         <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
//                     </svg>
//                     Add New Product
//                 </Link>
//             </div>

//             {loading ? (
//                 <div className="flex justify-center items-center h-64">
//                     <Spinner />
//                 </div>
//             ) : products.length === 0 ? (
//                 <div className="text-center py-10 text-lg text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 rounded-lg shadow-md">
//                     <p>No products found. Start by adding a new product!</p>
//                     <Link
//                         to="/admin/product/create"
//                         className='mt-4 inline-block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline'
//                     >
//                         Create your first product
//                     </Link>
//                 </div>
//             ) : (
//                 <div className="relative overflow-x-auto shadow-xl sm:rounded-lg border border-gray-200 dark:border-gray-700">
//                     <Table hoverable>
//                         <TableHead>
//                             <TableRow><TableHeadCell className="p-4">Image</TableHeadCell>
//                                 <TableHeadCell>Product Name</TableHeadCell>
//                                 <TableHeadCell>Price</TableHeadCell>
//                                 <TableHeadCell>Category</TableHeadCell>
//                                 <TableHeadCell className="text-center">Active</TableHeadCell>
//                                 <TableHeadCell className="text-center">Actions</TableHeadCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody className="divide-y">
//                             {products.map((product) => (
                                
//                                 <TableRow
//                                     key={product._id}
                                    
//                                     className="bg-gray-600 dark:bg-gray-800 border-b last:border-0 hover:bg-black dark:hover:bg-gray-900 transition duration-150 ease-in-out"
//                                 >
//                                     <TableCell className="p-4">
//                                         <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden border border-gray-300 dark:border-gray-600">
//                                             {product.imageUrl ? (
//                                                 <img
//                                                     src={product.imageUrl}
//                                                     alt={product.name || 'Product Image'}
//                                                     className="w-full h-full object-cover"
//                                                 />
//                                             ) : (
//                                                 <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs text-gray-500 dark:text-gray-400">No Img</div>
//                                             )}
//                                         </div>
//                                     </TableCell>
                                    
//                                     <TableCell className="px-6 py-4 font-medium text-white whitespace-nowrap dark:text-white">
//                                         {product.name}
//                                     </TableCell>
//                                     <TableCell className="px-6 py-4 text-white dark:text-white">
//                                         ${(product.priceInCents / 100).toFixed(2)}
//                                     </TableCell>
//                                     <TableCell className="px-6 py-4 capitalize text-white dark:text-white">
//                                         {product.category}
//                                     </TableCell>
//                                     <TableCell className="px-6 py-4 text-center">
//                                         <span className={`inline-flex px-2 text-xs font-semibold leading-5 rounded-full ${
//                                             product.isActive ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
//                                         }`}>
//                                             {product.isActive ? 'Yes' : 'No'}
//                                         </span>
//                                     </TableCell>
//                                     <TableCell className="px-6 py-4 text-center">
//                                         <div className='flex justify-center items-center gap-x-2'>
//                                             <Button
//                                                 as={Link}
//                                                 to={`/admin/product/edit/${product._id}`}
//                                                 color="yellow"
//                                                 pill
//                                                 size="sm"
//                                             >
//                                                 Edit
//                                             </Button>
//                                             <Button
//                                                 as={Link}
//                                                 to={`/admin/product/delete/${product._id}`}
//                                                 color="red"
//                                                 pill
//                                                 size="sm"
//                                             >
//                                                 Delete
//                                             </Button>
//                                         </div>
//                                     </TableCell>
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Admin;



//Admin.jsx
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Button, Badge } from "flowbite-react"; // Import Badge
import Spinner from '../components/Spinner';
import Stats from '../components/Stats';

const Admin = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
            .get(`${import.meta.env.VITE_REACT_APP_SERVER_BASE_URL}/products`)
            .then((response) => {
                const { products: fetchedProducts } = response.data;
                console.log("API Response (Admin page):", response.data);
                setProducts(fetchedProducts);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
                setLoading(false);
            });
    }, []);

    return (
        <div className='container max-w-screen-xl px-4 py-8 md:px-8 lg:px-12 bg-gray-900 dark:bg-gray-800 '>
            <h1 className='text-4xl font-extrabold text-center mb-10 text-gray-900 dark:text-white sm:text-5xl'>
                Admin Dashboard
            </h1>

            <Stats />

            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 mt-12 gap-4">
                <h2 className='text-3xl font-semibold text-gray-800 dark:text-gray-100'>Product Listings</h2>
                <Link
                    to="/admin/product/create"
                    className='inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-green-500 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition ease-in-out duration-150'
                >
                    <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Add New Product
                </Link>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Spinner />
                </div>
            ) : products.length === 0 ? (
                <div className="text-center py-10 text-lg text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                    <p>No products found. Start by adding a new product!</p>
                    <Link
                        to="/admin/product/create"
                        className='mt-4 inline-block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline'
                    >
                        Create your first product
                    </Link>
                </div>
            ) : (
                <div className="relative overflow-x-auto shadow-xl sm:rounded-lg border border-gray-200 dark:border-gray-700">
                    <Table hoverable>
                        <TableHead>
                            <TableRow>
                                <TableHeadCell className="p-4">Image</TableHeadCell>
                                <TableHeadCell>Product Name</TableHeadCell>
                                <TableHeadCell>Price</TableHeadCell>
                                <TableHeadCell>Category</TableHeadCell>
                                <TableHeadCell className="text-center">Active</TableHeadCell>
                                <TableHeadCell className="text-center">Actions</TableHeadCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className="divide-y">
                            {products.map((product) => (
                                <TableRow
                                    key={product._id}
                                    className="bg-gray-600 dark:bg-gray-800 border-b last:border-0 hover:bg-black dark:hover:bg-gray-900 transition duration-150 ease-in-out"
                                >
                                    <TableCell className="p-4">
                                        <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden border border-gray-300 dark:border-gray-600">
                                            {product.imageUrl ? (
                                                <img
                                                    src={product.imageUrl}
                                                    alt={product.name || 'Product Image'}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs text-gray-500 dark:text-gray-400">No Img</div>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="px-6 py-4 font-medium text-white whitespace-nowrap dark:text-white">
                                        {product.name}
                                    </TableCell>
                                    <TableCell className="px-6 py-4 text-white dark:text-white">
                                        ${(product.priceInCents / 100).toFixed(2)}
                                    </TableCell>
                                    <TableCell className="px-6 py-4 capitalize text-white dark:text-white">
                                        {product.category}
                                    </TableCell>
                                    <TableCell className="px-6 py-4 text-center">
                                        {/* Using Flowbite Badge for consistent styling */}
                                        <Badge
                                            color={product.isActive ? 'success' : 'failure'}
                                            className="mx-auto" // Center the badge
                                        >
                                            {product.isActive ? 'Active' : 'Inactive'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="px-6 py-4 text-center">
                                        <div className='flex justify-center items-center gap-x-2'>
                                            <Button
                                                as={Link}
                                                to={`/admin/product/edit/${product._id}`}
                                                color="yellow"
                                                // Adjust these classes to match the 'Add New Product' button more closely
                                                // Removed 'pill' and 'size' to allow for more custom sizing via className
                                                className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition ease-in-out duration-150'
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                as={Link}
                                                to={`/admin/product/delete/${product._id}`}
                                                color="red"
                                                // Adjust these classes to match the 'Add New Product' button more closely
                                                // Removed 'pill' and 'size' to allow for more custom sizing via className
                                                className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition ease-in-out duration-150'
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    );
};

export default Admin;