// File: Footer.jsx

"use client";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Footer,
    FooterBrand,
    FooterCopyright,
    FooterDivider,
    FooterIcon,
    FooterLink,
    FooterLinkGroup,
    FooterTitle,
} from "flowbite-react";
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";
import { HelperText, Label, TextInput, Button } from "flowbite-react";
import { useSnackbar } from "notistack";
import axios from "axios";


export function FooterComponent() {
    const [email, setEmail] = useState('');
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

        // New function to handle navigation
        const handleAdminLoginClick = (e) => {
            e.preventDefault(); // Prevent default if FooterLink still renders an <a>
            console.log("Admin Login button clicked (useNavigate test)");
            navigate('/login'); // Programmatically navigate to /login
        };

        const handleSubscribe = async (e) => {
            e.preventDefault();
                try {
                const response = await axios.post(`${import.meta.env.VITE_REACT_APP_SERVER_BASE_URL}/subscriber`, { email });
                enqueueSnackbar(`Subscription successful: ${response.data.email}`, { variant: 'success' });
                setEmail('');
                } catch (error) {
                    console.error('Error subscribing:', error);
                    enqueueSnackbar('Error subscribing: ' + error.response.data, { variant: 'error' });
                }
            };

    return (
        // <Footer container className="bg-gray-900 dark:bg-gray-950 text-gray-400 py-8">
        //     <div className="w-full max-w-screen-xl mx-auto px-4">
                
        //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-between">
        //             {/* Brand & Tagline */}
        //             <div className="flex flex-col items-start md:col-span-2 lg:col-span-1">
        //                 <FooterBrand
        //                     href="/"
        //                     src="https://flowbite.com/docs/images/logo.svg"
        //                     alt="Codeteria Logo"
        //                     name=""
        //                 >
        //                     <span className="self-center text-xl font-extrabold whitespace-nowrap text-white">Willow.</span>
        //                 </FooterBrand>
        //                 <p className="text-sm mt-2">Providing reliable tech since 2024</p>
        //             </div>

                    

        //             {/* Newsletter Form  */}
        //             <div className="md:col-span-2 lg:col-span-1">
        //                 <FooterTitle title="Stay in the loop" className="text-white" />
        //                 <form onSubmit={handleSubscribe} className="flex flex-col gap-2 mt-2">
        //                     <div>
        //                         <Label htmlFor="email-newsletter" value="Your email" className="sr-only" />
        //                         <TextInput
        //                             id="email-newsletter"
        //                             type="email"
        //                             placeholder="Enter your email"
        //                             value={email}
        //                             onChange={(e) => setEmail(e.target.value)}
        //                             required
        //                             sizing="sm"
        //                             className="w-full"
        //                         />
        //                     </div>
        //                     <Button type="submit" size="sm" className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
        //                         Subscribe
        //                     </Button>
        //                     <HelperText className="text-xs">
        //                         By subscribing, you agree to our{' '}
        //                         <a href="#" className="font-medium text-blue-500 hover:underline">
        //                             Privacy Policy
        //                         </a>.
        //                     </HelperText>
        //                 </form>
        //             </div>
        //             <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:col-span-2 lg:col-span-2">
        //                 {/* Company Links */}
        //                 <div>
        //                     <FooterTitle title="Company" className="text-white text-sm " />
        //                     <FooterLinkGroup col className="text-xs mt-1 font-light">
        //                         <FooterLink href="#">About Us</FooterLink>
        //                         <FooterLink href="#">Careers</FooterLink>
        //                         <FooterLink href="#">Blog</FooterLink>
        //                     </FooterLinkGroup>
        //                 </div>
        //                 {/* Legal Links */}
        //                 <div>
        //                     <FooterTitle title="Legal" className="text-white" />
        //                     <FooterLinkGroup col className="text-xs mt-1 font-light">
        //                         <FooterLink href="#">Privacy Policy</FooterLink>
        //                         <FooterLink href="#">Terms &amp; Conditions</FooterLink>
        //                     </FooterLinkGroup>
        //                 </div>
        //                  {/* Follow us Links */}
        //                 <div>
        //                     <FooterTitle title="Follow us" className="text-white" />
        //                     <FooterLinkGroup col className="text-xs mt-1">
        //                         <FooterLink href="#" className="flex items-center space-x-2">
        //                             <FooterIcon icon={BsInstagram} className="text-gray-400 hover:text-pink-500 text-lg" />                                  
        //                         </FooterLink>
        //                         <FooterLink href="#" className="flex items-center space-x-2">
        //                             <FooterIcon icon={BsGithub} className="text-gray-400 hover:text-gray-300 text-xs " />                                  
        //                         </FooterLink>
        //                         <FooterLink href="#" className="flex items-center space-x-2">
        //                             <FooterIcon icon={BsLinkedin} className="text-gray-400 hover:text-blue-600 text-lg" />
        //                         </FooterLink>
        //                     </FooterLinkGroup>
        //                 </div>
        //             </div>
        //         </div>

        //         <div>
        //         <Link 
        //             to="/admin-login" 
        //             onClick={handleAdminLoginClick} 
        //             className="text-gray-400 hover:text-blue-500 text-xs font-light"
        //         >
        //             Admin Login
        //         </Link>
        //         <FooterDivider className="my-16" />
        //         </div>
        //         <div className="w-full sm:flex sm:items-center sm:justify-between text-xs">
        //             <FooterCopyright href="#" by="Willow.™" year={2024} className="text-gray-500" />
        //         </div>
        //     </div>
        // </Footer>


        // <Footer container className="bg-gray-900 dark:bg-gray-950 text-gray-400 py-10">
        //     <div className="w-full max-w-screen-md mx-auto px-4 flex flex-col gap-10">
                
        //         {/* Brand & Tagline */}
        //         <div className="flex flex-col items-start">
        //         <FooterBrand
        //             href="/"
        //             src="https://flowbite.com/docs/images/logo.svg"
        //             alt="Willow Logo"
        //             name=""
        //         >
        //             <span className="self-center text-xl font-extrabold text-white">Willow.</span>
        //         </FooterBrand>
        //         <p className="text-sm mt-2">Providing reliable tech since 2024</p>
        //         </div>

        //         {/* Newsletter Form */}
        //         <div>
        //         <FooterTitle title="Stay in the loop" className="text-white" />
        //         <form onSubmit={handleSubscribe} className="flex flex-col gap-2 mt-2">
        //             <div>
        //             <Label htmlFor="email-newsletter" value="Your email" className="sr-only" />
        //             <TextInput
        //                 id="email-newsletter"
        //                 type="email"
        //                 placeholder="Enter your email"
        //                 value={email}
        //                 onChange={(e) => setEmail(e.target.value)}
        //                 required
        //                 sizing="sm"
        //                 className="w-full"
        //             />
        //             </div>
        //             <Button
        //             type="submit"
        //             size="sm"
        //             className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        //             >
        //             Subscribe
        //             </Button>
        //             <HelperText className="text-xs">
        //             By subscribing, you agree to our{' '}
        //             <a href="#" className="font-medium text-blue-500 hover:underline">
        //                 Privacy Policy
        //             </a>.
        //             </HelperText>
        //         </form>
        //         </div>

        //         {/* Company Links */}
        //         <div>
        //         <FooterTitle title="Company" className="text-white" />
        //         <FooterLinkGroup col className="text-xs mt-1 font-light">
        //             <FooterLink href="#">About Us</FooterLink>
        //             <FooterLink href="#">Careers</FooterLink>
        //             <FooterLink href="#">Blog</FooterLink>
        //         </FooterLinkGroup>
        //         </div>

        //         {/* Follow Us */}
        //         <div>
        //         <FooterTitle title="Follow us" className="text-white" />
        //         <FooterLinkGroup col className="text-xs mt-1">
        //             <FooterLink href="#" className="flex items-center space-x-2">
        //             <FooterIcon icon={BsInstagram} className="text-gray-400 hover:text-pink-500 text-lg" />
        //             </FooterLink>
        //             <FooterLink href="#" className="flex items-center space-x-2">
        //             <FooterIcon icon={BsGithub} className="text-gray-400 hover:text-gray-300 text-xs" />
        //             </FooterLink>
        //             <FooterLink href="#" className="flex items-center space-x-2">
        //             <FooterIcon icon={BsLinkedin} className="text-gray-400 hover:text-blue-600 text-lg" />
        //             </FooterLink>
        //         </FooterLinkGroup>
        //         </div>

        //         {/* Legal Links */}
        //         <div>
        //         <FooterTitle title="Legal" className="text-white" />
        //         <FooterLinkGroup col className="text-xs mt-1 font-light">
        //             <FooterLink href="#">Privacy Policy</FooterLink>
        //             <FooterLink href="#">Terms &amp; Conditions</FooterLink>
        //         </FooterLinkGroup>
        //         </div>

        //         {/* Admin Login */}
        //         <div>
        //         <Link
        //             to="/admin-login"
        //             onClick={handleAdminLoginClick}
        //             className="text-gray-400 hover:text-blue-500 text-xs font-light"
        //         >
        //             Admin Login
        //         </Link>
        //         </div>

        //         <FooterDivider className="my-8" />
        //         <div className="text-center text-xs text-gray-500">
        //         <FooterCopyright href="#" by="Willow.™" year={2024} />
        //         </div>
        //     </div>
        //     </Footer>

        <Footer container className="bg-gray-900 dark:bg-gray-950 text-gray-400 py-10">
            <div className="w-full max-w-screen-xl mx-auto px-4">
                <div className="flex flex-wrap justify-between gap-8">

                {/* Logo & Tagline */}
                <div className="min-w-[180px] max-w-xs flex flex-col">
                    <FooterBrand
                    href="/"
                    src="https://flowbite.com/docs/images/logo.svg"
                    alt="Willow Logo"
                    >
                    <span className="self-center text-xl font-extrabold text-white">Willow.</span>
                    </FooterBrand>
                    <p className="text-sm mt-2">Providing reliable tech since 2024</p>
                </div>

                {/* Newsletter */}
                <div className="min-w-[200px] max-w-xs">
                    <FooterTitle title="Stay in the loop" className="text-white" />
                    <form onSubmit={handleSubscribe} className="flex flex-col gap-2 mt-2">
                    <TextInput
                        id="email-newsletter"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        sizing="sm"
                        className="w-full"
                    />
                    <Button type="submit" size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                        Subscribe
                    </Button>
                    <HelperText className="text-xs">
                        By subscribing, you agree to our{' '}
                        <a href="#" className="font-medium text-blue-500 hover:underline">Privacy Policy</a>.
                    </HelperText>
                    </form>
                </div>

                {/* Company */}
                <div className="min-w-[120px]">
                    <FooterTitle title="Company" className="text-white" />
                    <FooterLinkGroup col className="text-xs mt-1 font-light">
                    <FooterLink href="#">About Us</FooterLink>
                    <FooterLink href="#">Careers</FooterLink>
                    <FooterLink href="#">Blog</FooterLink>
                    </FooterLinkGroup>
                </div>

                {/* Follow Us */}
                <div className="min-w-[120px]">
                    <FooterTitle title="Follow us" className="text-white" />
                    <FooterLinkGroup col className="text-xs mt-1">
                    <FooterLink href="#"><FooterIcon icon={BsInstagram} /></FooterLink>
                    <FooterLink href="#"><FooterIcon icon={BsGithub} /></FooterLink>
                    <FooterLink href="#"><FooterIcon icon={BsLinkedin} /></FooterLink>
                    </FooterLinkGroup>
                </div>

                {/* Legal */}
                <div className="min-w-[120px]">
                    <FooterTitle title="Legal" className="text-white" />
                    <FooterLinkGroup col className="text-xs mt-1 font-light">
                    <FooterLink href="#">Privacy Policy</FooterLink>
                    <FooterLink href="#">Terms & Conditions</FooterLink>
                    </FooterLinkGroup>
                </div>
                </div>

                {/* Admin + Copyright */}
                <div className="mt-8 text-xs text-gray-500 flex flex-col sm:flex-row sm:justify-between items-center">
                <Link
                    to="/admin-login"
                    onClick={handleAdminLoginClick}
                    className="text-gray-400 hover:text-blue-500 font-light mb-2 sm:mb-0"
                >
                    Admin Login
                </Link>
                <FooterCopyright href="#" by="Willow.™" year={2024} />
                </div>
            </div>
        </Footer>


    );
}

export default FooterComponent;