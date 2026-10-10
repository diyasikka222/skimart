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
    },
  },
  plugins: [],
}