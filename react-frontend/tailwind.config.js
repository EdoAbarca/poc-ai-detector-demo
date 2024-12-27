/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      /*
      colors:{
        fuchsia:colors.fuchsia,
        cyan:colors.cyan,
        emerald:colors.emerald,
        teal:colors.teal,
        orange:colors.orange,
        yellow:colors.yellow,
      },
      maxHeight:{
        116:"29rem", 
        125:"31.25rem", 
        140:"35rem", 
        150:"37.5rem", 
        190:"47.5rem", 
      },
      height:{
        116:"29rem", 
        125:"31.25rem", 
        140:"35rem", 
        150:"37.5rem", 
      },
      minHeight:{
        18:"4.5rem", 
        62:"15.5rem",
        150:"37.5rem",
      },
    },
  },
      */
    },
    fontFamily: {
      display: ['Inter', 'system-ui', 'sans-serif'],
      body: ['Inter', 'system-ui', 'sans-serif'],
    },
  },
  variants: {
    //borderWidth: ['responsive', 'hover', 'focus'],
    /*
    extend: {
      display: ["group-hover"],
      opacity: ["group-hover"],
      translate: ["group-hover"],
      transform: ["group-hover"],
      width: ["group-hover", "hover"],
      height: ["group-hover", "hover"],
      padding: ["group-hover", "hover"],
      animation: ["group-hover", "hover"],
      scale: ["group-hover", "hover"],
    },
     */
  },
  plugins: [],
}

