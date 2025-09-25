/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // QuickSync Blue Palette
        primary: {
          50: '#AED3E3',   // Lightest blue
          100: '#86BEDA',  // Light blue
          200: '#78B4E3',  // Medium light blue
          300: '#4E97D1',  // Medium blue
          400: '#0969C2',  // Main blue
          500: '#006489',  // Primary brand blue
          600: '#00527C',  // Darker blue
          700: '#003F5D',  // Dark blue
          800: '#002A3E',  // Very dark blue
          900: '#001A2B',  // Darkest blue
        },
        secondary: {
          50: '#E9F4F7',   // Very light teal
          100: '#B8E1EA',  // Light teal
          200: '#86CEDD',  // Medium teal
          300: '#54BBD0',  // Teal
          400: '#22A8C3',  // Dark teal
          500: '#006489',  // Main teal
          600: '#005070',  // Darker teal
          700: '#003C57',  // Dark teal
          800: '#00283E',  // Very dark teal
          900: '#001425',  // Darkest teal
        },
        accent: {
          50: '#F0F8FF',   // Very light accent
          100: '#E1F1FE',  // Light accent
          200: '#C3E3FD',  // Medium light accent
          300: '#A4D5FC',  // Medium accent
          400: '#86C7FB',  // Accent
          500: '#68B9FA',  // Main accent
          600: '#4A9BE8',  // Darker accent
          700: '#3B7DC6',  // Dark accent
          800: '#2C5FA4',  // Very dark accent
          900: '#1D4182',  // Darkest accent
        },
        success: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#22C55E',
          600: '#16A34A',
          700: '#15803D',
          800: '#166534',
          900: '#14532D',
        },
        warning: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        error: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#EF4444',
          600: '#DC2626',
          700: '#B91C1C',
          800: '#991B1B',
          900: '#7F1D1D',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 100, 137, 0.1), 0 4px 6px -2px rgba(0, 100, 137, 0.05)',
        'medium': '0 4px 25px -5px rgba(0, 100, 137, 0.15), 0 10px 10px -5px rgba(0, 100, 137, 0.04)',
        'strong': '0 10px 40px -10px rgba(0, 100, 137, 0.25), 0 20px 25px -5px rgba(0, 100, 137, 0.1)',
      },
    },
  },
  plugins: [],
};
