/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          // Maps to CSS variables defined in src/styles/index.css
          orange: 'var(--brand-orange)',
          'orange-deep': 'var(--brand-orange-deep)',
          green: 'var(--brand-green)',
          'green-deep': 'var(--brand-green-deep)',
          'green-leaf': 'var(--brand-green-leaf)',
          'green-pale': 'var(--brand-green-pale)',
          'green-light': 'var(--brand-green-light)',
          cream: 'var(--brand-cream)',
          'orange-tint': 'var(--brand-orange-tint)',
        },
        surface: {
          DEFAULT: 'var(--surface-main)',
          secondary: 'var(--surface-secondary)',
          subtle: 'var(--surface-subtle)',
        },
        ink: {
          DEFAULT: 'var(--ink)',
          secondary: 'var(--ink-secondary)',
          muted: 'var(--ink-muted)',
        },
        line: 'var(--line)',
        state: {
          error: 'var(--state-error)',
          success: 'var(--state-success)',
          warning: 'var(--state-warning)',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      maxWidth: {
        container: '1440px',
      },
      spacing: {
        // Extra step used by the large button size (h-13 = 52px).
        13: '3.25rem',
      },
      borderRadius: {
        control: 'var(--radius-control)',
        card: 'var(--radius-card)',
        banner: 'var(--radius-banner)',
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        'card-hover': 'var(--shadow-card-hover)',
        header: 'var(--shadow-header)',
        popover: 'var(--shadow-popover)',
      },
      transitionTimingFunction: {
        standard: 'var(--ease-standard)',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'welcome-fade': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'welcome-pop': {
          '0%': { opacity: '0', transform: 'scale(0.88) translateY(12px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
      },
      animation: {
        marquee: 'marquee 22s linear infinite',
        'welcome-fade': 'welcome-fade 220ms ease-out both',
        'welcome-pop': 'welcome-pop 480ms cubic-bezier(0.18, 0.89, 0.32, 1.1) both',
      },
    },
  },
  plugins: [],
}