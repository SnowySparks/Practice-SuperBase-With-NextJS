import type { Config } from "tailwindcss";
import withMT from "@material-tailwind/react/utils/withMT";
import Typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./utils/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {},
  plugins: [Typography],
};

export default withMT(config);
