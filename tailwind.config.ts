import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ["var(--font-ibm-plex-mono)", "monospace"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        sand: {
          50: '#fbf8f4',
          100: '#f5f2eb',
          200: '#e6dfd4',
          300: '#d4c8b9',
          400: '#bba795',
          500: '#9b8d83',
          600: '#766b63',
          700: '#5c534c',
          800: '#2c2420',
        }
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        letterSlide: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        typeIn: {
          from: {
            clipPath: 'inset(0 100% 0 0)'
          },
          to: {
            clipPath: 'inset(0 0 0 0)'
          }
        },
        blink: {
          '50%': { opacity: '0' }
        },
        dance: {
          '0%, 100%': { transform: 'scale(1) skew(0deg)' },
          '25%': { transform: 'scale(1.1) skew(-3deg)' },
          '50%': { transform: 'scale(0.9) skew(3deg)' },
          '75%': { transform: 'scale(1.05) skew(-1deg)' },
        },
        slideDown: {
          '0%': { 
            transform: 'translateY(-100%)',
            opacity: '0'
          },
          '100%': { 
            transform: 'translateY(0)',
            opacity: '1'
          },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        slideIn: 'slideIn 0.3s ease-out',
        letterSlide: 'letterSlide 0.3s ease-out forwards',
        typeIn: 'typeIn 0.5s steps(20, end)',
        blink: 'blink 1s steps(1) infinite',
        dance: 'dance 2s ease-in-out infinite',
        slideDown: 'slideDown 0.5s ease-out forwards',
        fadeIn: 'fadeIn 0.5s ease-in-out',
      }
    },
  },
  plugins: [],
};

export default config;
