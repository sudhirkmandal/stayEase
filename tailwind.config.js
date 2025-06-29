/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#FF5A5F', // Airbnb signature red
        'primary-foreground': '#FFFFFF', // white
        
        // Secondary Colors
        'secondary': '#767676', // neutral gray
        'secondary-foreground': '#FFFFFF', // white
        
        // Accent Colors
        'accent': '#008489', // teal
        'accent-foreground': '#FFFFFF', // white
        
        // Background Colors
        'background': '#FFFFFF', // pure white
        'surface': '#F7F7F7', // subtle warm gray
        
        // Text Colors
        'text-primary': '#222222', // near-black
        'text-secondary': '#717171', // medium gray
        
        // Status Colors
        'success': '#00A699', // vibrant teal
        'success-foreground': '#FFFFFF', // white
        'warning': '#FC642D', // warm orange
        'warning-foreground': '#FFFFFF', // white
        'error': '#C13515', // deep red
        'error-foreground': '#FFFFFF', // white
        
        // Border Colors
        'border': '#E5E5E5', // light gray
        'border-input': '#E5E5E5', // light gray
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'source-sans': ['Source Sans Pro', 'sans-serif'],
        'jetbrains': ['JetBrains Mono', 'monospace'],
      },
      fontWeight: {
        'normal': '400',
        'medium': '500',
        'semibold': '600',
      },
      boxShadow: {
        'sm': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'md': '0 4px 12px rgba(0, 0, 0, 0.15)',
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
      },
      transitionDuration: {
        '200': '200ms',
        '300': '300ms',
        '400': '400ms',
      },
      transitionTimingFunction: {
        'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
        'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      zIndex: {
        '1000': '1000',
        '1010': '1010',
        '1020': '1020',
      },
      spacing: {
        '18': '4.5rem',
        '80': '20rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
  ],
}