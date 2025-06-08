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
                        <FooterLink href="#" onClick={handleAdminLoginClick}>
                                Admin Login
                        </FooterLink>
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
                { /*Copyright */}
            <div>
                <FooterDivider className="my-3" />
                <FooterCopyright href="#" by="Willow.™" year={2024} />
                </div>
            </div>
        </Footer>
    );
}

export default FooterComponent;