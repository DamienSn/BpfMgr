module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            backgroundImage: {
                man: "/img/man.jpg",
            },
            animation: {
                bounce200: "bounce 1s infinite 200ms",
                bounce400: "bounce 1s infinite 400ms",
            },
        },
    },
    variants: {
        extend: {
            boxShadow: ["hover", "focus", "active"]
        },
    },
    plugins: [],
};
