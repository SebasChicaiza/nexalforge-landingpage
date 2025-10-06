import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: { extend: {
    colors: {
        "nf-primary-400": "#B84550",
        "nf-primary-500": "#8B1E2D",
        "nf-primary-600": "#7A1A28",
        "nf-background":  "#0A0A0B",
        "nf-text-light":  "#E5E7EB",
        "nf-secondary-400": "#3A3A3A",
      },
  } },
  plugins: [typography],
} satisfies Config
