/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
        "./node_modules/flowbite/**/*.js",
    ],
    theme: {
        extend: {
            fontFamily: {
                barlow: ['barlow', 'sans-serif'],
                willow: ['cursive', 'ui-serif'],
            },
        },
    },
    darkMode: 'class',
    plugins: [
        require("@tailwindcss/typography"),
        require('flowbite/plugin'),
    ],
};
