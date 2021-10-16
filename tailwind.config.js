module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        'man': '/img/man.jpg'
      },
    },
  },
  variants: {
    extend: {
      boxShadow: ["hover", "focus", "active"]
    }
  }, 
  plugins: [],
}
