/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#eef3ec',
          100: '#d3e0cd',
          200: '#a8c29d',
          300: '#7ea36e',
          400: '#557f45',
          500: '#3c6330',
          600: '#2d4d24',
          700: '#1f3b1c',
          800: '#182e16',
          900: '#0f1e0e',
          950: '#0a1509',
        },
        clay: {
          50: '#faf1e8',
          100: '#f2ddc4',
          200: '#e5bd8c',
          300: '#d59c5c',
          400: '#c17f3c',
          500: '#a85c2c',
          600: '#8c4a24',
          700: '#6d3a1e',
        },
        sand: {
          50: '#fdfbf6',
          100: '#f7f1e3',
          200: '#efe4cc',
          300: '#e3d3ab',
        },
        ink: '#241f18',
      },
      fontFamily: {
        display: ['"Fraunces"', 'Georgia', 'serif'],
        body: ['"Work Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(31, 59, 28, 0.25)',
        card: '0 4px 20px -6px rgba(36, 31, 24, 0.15)',
      },
      backgroundImage: {
        'leaf-texture': "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.06) 0%, transparent 40%)",
      },
    },
  },
  plugins: [],
};
