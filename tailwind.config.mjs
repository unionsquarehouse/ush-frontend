/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        ivy: ["Ivy Mode", "sans-serif"],
        display: ['var(--font-playfair)', 'serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.16' }],
        '6xl': ['3.75rem', { lineHeight: '1.1' }],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: "#866c4c",
        "brand-hover": "#ac895e",
        earth: {
          50: "#f5f5f0",
          100: "#e6e4d8",
          200: "#d7d2c0",
          300: "#c2baa3",
          400: "#aca189",
          500: "#968b74",
          600: "#7d7460",
          700: "#645c4c",
          800: "#4d473b",
          900: "#38342c",
        },
         cyan: {
          200: '#A5F3FC',
          300: '#67E8F9',
          400: '#22D3EE',
          500: '#06B6D4',
          600: '#0891B2',
        },
      },
      background: {
        'brand-gradient':'bg-gradient-to-r from-[#866c4c] to-[#ac895e]',
      },
      backgroundImage: {
        
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'noise': "url('/assets/noise.png')",
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
    },
  },
  plugins: [],
};


