/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#0f172a', // Slate 900
                    light: '#334155', // Slate 700
                    dark: '#020617', // Slate 950
                },
                secondary: {
                    DEFAULT: '#1e293b', // Slate 800
                    foreground: '#f8fafc', // Slate 50
                },
                accent: {
                    DEFAULT: '#3b82f6', // Blue 500
                    hover: '#2563eb', // Blue 600
                    foreground: '#ffffff',
                },
                background: '#f1f5f9', // Slate 100
                surface: '#ffffff',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
