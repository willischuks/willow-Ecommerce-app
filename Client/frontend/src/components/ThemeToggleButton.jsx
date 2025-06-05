// ThemeToggleButton.jsx
import React, { useState, useEffect } from 'react';

const ThemeToggleButton = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        const systemDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme = storedTheme || (systemDarkMode ? 'dark' : 'light');

        document.documentElement.setAttribute('data-theme', initialTheme);
        setIsDarkMode(initialTheme === 'dark');
    }, []);

    const toggleTheme = () => {
        const newTheme = isDarkMode ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        setIsDarkMode(!isDarkMode);
        localStorage.setItem('theme', newTheme); 
    };

    return (
        <label className="flex cursor-pointer gap-2">
            {isDarkMode ? (
                <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
            ) : (
                <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                </svg>
            )}
            <input
                type="checkbox"
                value="synthwave"
                className="toggle theme-controller sr-only" 
                checked={isDarkMode}
                onChange={toggleTheme}
            />
        </label>
    );
}

export default ThemeToggleButton;