/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#142D4E',
          'navy-light': '#1E3F6B',
          'navy-dark': '#0E1F35',
          teal: '#167D78',
          'teal-light': '#1A9B95',
          'teal-dark': '#125F5B',
          bg: '#F3F6FA',
          'bg-alt': '#E8ECF2',
          gold: '#F0B44D',
          'gold-light': '#F5CC7A',
          'gold-dark': '#D99A2B',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          muted: '#F8F9FB',
        },
        text: {
          primary: '#142D4E',
          secondary: '#4A5568',
          muted: '#718096',
          inverse: '#FFFFFF',
        },
        status: {
          success: '#22C55E',
          error: '#EF4444',
          warning: '#F59E0B',
          info: '#3B82F6',
        },
        border: {
          DEFAULT: '#E2E8F0',
          focus: '#167D78',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans Ethiopic', 'system-ui', 'sans-serif'],
        ethiopic: ['Noto Sans Ethiopic', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        display: ['2rem', { lineHeight: '2.5rem', letterSpacing: '-0.02em' }],
        h1: ['1.75rem', { lineHeight: '2.25rem', letterSpacing: '-0.01em' }],
        h2: ['1.375rem', { lineHeight: '1.875rem' }],
        h3: ['1.125rem', { lineHeight: '1.625rem' }],
        body: ['1rem', { lineHeight: '1.625rem' }],
        'body-sm': ['0.875rem', { lineHeight: '1.375rem' }],
        caption: ['0.75rem', { lineHeight: '1.125rem' }],
      },
      spacing: {
        'nav-height': '64px',
        'nav-height-mobile': '56px',
        'bottom-nav': '64px',
        'sidebar-w': '280px',
        'sidebar-w-collapsed': '64px',
        'content-max': '1200px',
        'lesson-max': '720px',
      },
      screens: {
        xs: '360px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
      borderRadius: {
        card: '12px',
        button: '8px',
        badge: '6px',
        pill: '9999px',
      },
      boxShadow: {
        card: '0 1px 3px rgba(20,45,78,0.08), 0 1px 2px rgba(20,45,78,0.06)',
        'card-hover': '0 4px 12px rgba(20,45,78,0.12)',
        nav: '0 2px 8px rgba(20,45,78,0.08)',
        modal: '0 20px 60px rgba(20,45,78,0.2)',
      },
    },
  },
  plugins: [],
};
