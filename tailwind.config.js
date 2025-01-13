/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.jsx",
        "./resources/**/*.js",
    ],
    theme: {
        extend: {
            colors: {
                theme: {
                    DEFAULT: 'var(--theme-color)',
                    start: 'var(--gradient-start)',
                    end: 'var(--gradient-end)'
                }
            },
            backgroundImage: {
                'theme-gradient': 'linear-gradient(to right, var(--gradient-start), var(--gradient-end))',
                'theme-gradient-hover': 'linear-gradient(to right, var(--gradient-end), var(--gradient-start))'
            }
        },
    },
    plugins: [],
};
