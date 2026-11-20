/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    container: { center: true, padding: { DEFAULT: '1.25rem', lg: '2rem' }, screens: { '2xl': '1320px' } },
    extend: {
      colors: {
        navy: { 950: '#071229', 900: '#0B1A38', 700: '#11244C', 500: '#1E3A70', 300: '#4A6396' },
        aqua: { 400: '#2F6FB5', 300: '#5B93D1', 100: '#E8EEF8' },
        leaf: { 700: '#0F6E21', 600: '#148A2A', 500: '#1C8D31' },
        lime: { 500: '#86B42E', 300: '#B5D57A' },
        mist: { 50: '#F5F4F9', 100: '#ECEBF3' },
        ink: { 600: '#595959', 800: '#272727' },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', '"IBM Plex Sans Arabic"', 'system-ui', 'sans-serif'],
        sans: ['Inter', '"IBM Plex Sans Arabic"', 'system-ui', 'sans-serif'],
        arabic: ['"IBM Plex Sans Arabic"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        stripes: 'linear-gradient(110deg, #11244C 0%, #11244C 55%, #148A2A 55%, #148A2A 80%, #86B42E 80%)',
        'stripes-rtl': 'linear-gradient(-110deg, #11244C 0%, #11244C 55%, #148A2A 55%, #148A2A 80%, #86B42E 80%)',
        'footer-bar': 'linear-gradient(90deg, #11244C 0 40%, #148A2A 40% 80%, #86B42E 80% 100%)',
      },
      boxShadow: {
        card: '0 1px 2px rgba(17,36,76,.06), 0 12px 32px -12px rgba(17,36,76,.18)',
        lift: '0 24px 60px -20px rgba(17,36,76,.35)',
      },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        pulseRing: { '0%': { transform: 'scale(.6)', opacity: '.9' }, '100%': { transform: 'scale(2.6)', opacity: '0' } },
      },
      animation: { marquee: 'marquee 45s linear infinite', pulseRing: 'pulseRing 2.2s ease-out infinite' },
    },
  },
  plugins: [],
}
