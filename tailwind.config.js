const defaultTheme = require("tailwindcss/defaultTheme");
3;
/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["DM Sans Variable", ...defaultTheme.fontFamily.sans],
            },
        },
    },
    plugins: [],
};
