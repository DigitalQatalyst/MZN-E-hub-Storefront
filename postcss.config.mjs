const config = {
    plugins: {
        "@tailwindcss/postcss": {
            content: ["./src/**/*.{js,ts,jsx,tsx}"],
        },
        autoprefixer: {},
    },
};

export default config;
