import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        calm: {
          bg: '#fdfbf8',
          surface: '#f6f1e8',
          border: '#e6dccb',
          text: '#3f3a31',
          muted: '#736b5f',
          accent: '#8b7355'
        }
      }
    }
  },
  plugins: []
} satisfies Config;
