// tailwind.config.js
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',  // Include your Next.js pages
    './components/**/*.{js,ts,jsx,tsx}',  // Include any custom components
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          200: '#E9D8FD', // You can customize shades of purple here
          600: '#7C3AED',
        },
        // You can also add other colors that you need
      },
    },
  },
  plugins: [],
};
