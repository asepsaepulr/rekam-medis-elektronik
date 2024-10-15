import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './context/**/*.{js,ts,jsx,tsx}',
    './features/**/*.{js,ts,jsx,tsx}',
  ],
  important: '#__next',
  theme: {
    fontFamily: {
      sans: ['var(--font-primary)', ...defaultTheme.fontFamily.sans],
      secondary: ['var(--font-secondary)', 'sans-serif'],
    },
    extend: {
      colors: {
        "white-1": "#F8F8F8",
        "grey-1": "#616161",
        "grey-2": "#E5E7EB",
        "blue-1": "#005EBE",
        "blue-2": "#E9F5FE",
        "blue-3": "#F5F7F9",
        "red-1": "#FF0000",
        primary: {
          50: '#ebf5f9',
          100: '#cce6ef',
          200: '#99cddf',
          300: '#66b5cf',
          400: '#339cbf',
          500: '#0083af',
          600: '#00698c',
          700: '#004f69',
          800: '#003446',
          900: '#001a23',
        },
        secondary: {
          50: '#e6f3f9',
          100: '#b0daec',
          200: '#8ac8e2',
          300: '#54afd5',
          400: '#339fcd',
          500: '#0087c1',
          600: '#007bb0',
          700: '#006089',
          800: '#004a6a',
          900: '#003951',
        },
        tertiary: {
          50: '#e7edef',
          100: '#b4c8cf',
          200: '#8fadb7',
          300: '#5c8796',
          400: '#3d7082',
          500: '#0c4c63',
          600: '#0b455a',
          700: '#093646',
          800: '#072a36',
          900: '#05202a',
        },
        danger: {
          50: '#fceaea',
          100: '#f6bebe',
          200: '#f29e9e',
          300: '#ec7272',
          400: '#e85656',
          500: '#e22c2c',
          600: '#ce2828',
          700: '#a01f1f',
          800: '#7c1818',
          900: '#5f1212',
        },
        success: {
          50: '#eaf9eb',
          100: '#bfecc1',
          200: '#a0e3a3',
          300: '#74d778',
          400: '#59cf5e',
          500: '#30c336',
          600: '#2cb131',
          700: '#228a26',
          800: '#1a6b1e',
          900: '#145217',
        },
        warning: {
          50: '#fffbeb',
          100: '#fff1bf',
          200: '#ffeaa1',
          300: '#ffe176',
          400: '#ffdb5b',
          500: '#ffd232',
          600: '#e8bf2e',
          700: '#b59524',
          800: '#8c741c',
          900: '#6b5815',
        },
        grey: {
          50: '#F5F5F5',
          100: '#f0f0f0',
          200: '#e4e4e4',
          300: '#d1d1d1',
          400: '#bfbfbf',
          500: '#9a9a9a',
          600: '#818181',
          700: '#6a6a6a',
          800: '#595959',
          900: '#4e4e4e',
        },
        n: {
          1: '#ffffff',
          2: '#fdfdfd',
          3: '#f6f6f6',
          4: '#f2f2f2',
          5: '#dbdbdb',
          6: '#c4c4c4',
          7: '#949494',
          8: '#666666',
          9: '#525252',
          10: '#363636',
          11: '#2e2e2e',
          12: '#252525',
          13: '#121212',
        },
      },
      spacing: {
        4.5: '1.15rem',
        86: '21.5rem',
        128: '32rem',
        144: '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      transitionProperty: {
        width: 'width',
      },
      fontSize: {
        xs: '0.6875rem',
        sm: '0.75rem',
        base: '0.875rem',
        lg: '1rem',
        xl: '1.125rem',
        '2xl': '1.25rem',
        '3xl': '1.563rem',
        '4xl': '1.953rem',
        '5xl': '2.441rem',
      },
    },
  },
  plugins: [],
} satisfies Config;
