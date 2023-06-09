import { type Config } from "tailwindcss";

export default {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
} satisfies Config;
