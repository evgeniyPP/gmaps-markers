module.exports = {
    purge: ['./public/index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            spacing: {
                '120': '30rem',
            },
            maxWidth: {
                '11/12': '91.666667%',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
