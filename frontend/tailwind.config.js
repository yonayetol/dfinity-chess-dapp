module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          400: '#4a90e2',
          500: '#357abd',
          600: '#2a5f9e',
        },
        secondary: {
          400: '#f39c12',
          500: '#e67e00',
          600: '#d35400',
        },
        accent: {
          400: '#e74c3c',
          500: '#c0392b',
          600: '#a93226',
        },
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'float-slow': 'float 4s ease-in-out infinite',
        'float-slower': 'float 5s ease-in-out infinite',
        'glow': 'glow 2s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(74, 144, 226, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(74, 144, 226, 0.8)' },
        },
      },
    },
  },
  plugins: [],
};
