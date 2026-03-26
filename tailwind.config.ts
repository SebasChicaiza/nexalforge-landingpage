import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: { extend: {
    colors: {
      "nf-primary": {
        50: "#FDF2F3",
        100: "#FBE7E9",
        200: "#F4C8CD",
        300: "#E898A1",
        400: "#B84550",
        500: "#8B1E2D",
        600: "#7A1A28",
        700: "#621520",
        800: "#491018",
        900: "#320A11",
      },
      "nf-primary-50": "#FDF2F3",
      "nf-primary-100": "#FBE7E9",
      "nf-primary-200": "#F4C8CD",
      "nf-primary-300": "#E898A1",
      "nf-primary-400": "#B84550",
      "nf-primary-500": "#8B1E2D",
      "nf-primary-600": "#7A1A28",
      "nf-primary-700": "#621520",
      "nf-primary-800": "#491018",
      "nf-primary-900": "#320A11",
      "nf-background":  "#0A0A0B",
      "nf-text-light":  "#E5E7EB",
      "nf-secondary-400": "#3A3A3A",
      },
  } },
  plugins: [typography],
} satisfies Config
