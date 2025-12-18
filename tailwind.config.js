/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Rubik', 'sans-serif'],
                mono: ['Share Tech Mono', 'monospace'],
            },
        },
    },
    plugins: [],
}
