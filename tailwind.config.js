module.exports = {
    content: ["./src/**/*.{html,js,jsx}", "./src/**/**/**/*.{html,js,jsx}"],
    theme: {
        screens: {
            "xl": "1366px",
            // => @media (min-width: 1366px) { ... }
            "1xl": "1440px",
            "2xl": "1920px",
            // => @media (min-width: 1920px) { ... }
        },
        fontFamily: {
            'sans': ['sans-serif'],
            title: "Playfair Display",
        },
    },
    plugins: [],
};
