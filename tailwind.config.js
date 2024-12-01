/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        'custom-wallpaper': "url('/Assets/wallpaper.jpg')", // Chemin de votre image
        'barber-wallpaper' : "url('/Assets/barber_shop.jpg')"
      },
      fontFamily: {
        chakrapetch: ['Chakra Petch', 'sans-serif'], // Déclarez un alias pour la police
      },
    },
  },
  plugins: [],
};
