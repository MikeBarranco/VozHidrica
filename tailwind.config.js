/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        banorte: {
          red: '#EB0029',
          'red-hover': '#DB0026',
          gray: '#323E48',
          white: '#FFFFFF',
        },
        text: {
          primary: '#323E48',
          secondary: '#5B6670',
          disabled: '#C1C5C8',
          error: '#EB0029',
        },
        background: {
          field: '#F6F6F6',
          disabled: '#CFD2D3',
        },
      },
      fontFamily: {
        gotham: ['Gotham', 'Arial', 'sans-serif'],
      },
      fontSize: {
        '8': '8px',
        '12': '12px',
        '14': '14px',
        '15': '15px',
        '20': '20px',
        '25': '25px',
        '30': '30px',
      },
      spacing: {
        '4': '4px',
        '5': '5px',
        '6': '6px',
        '10': '10px',
        '12': '12px',
        '15': '15px',
        '20': '20px',
        '30': '30px',
        '45': '45px',
        '50': '50px',
      },
    },
  },
  plugins: [],
};
