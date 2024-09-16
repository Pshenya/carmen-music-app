import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'primary': '#FF5D73',
      },
      boxShadow: {
        custom: '0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)',
      },
      keyframes: {
        'slide-up-and-fade': {
          'from': { opacity: '0', transform: 'translateY(2px)' },
          'to': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        'slide-up-and-fade': '400ms cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [
    require('@codaworks/react-glow/tailwind'),
  ],
};
export default config;
