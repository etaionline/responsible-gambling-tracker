/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			colors: {
				// Background hierarchy
				'bg-pure-black': '#000000',
				'bg-base': '#0a0a0a',
				'bg-elevated': '#141414',
				'bg-hover': '#1e1e1e',
				'bg-tooltip': '#282828',
				// Text colors
				'text-primary': '#e4e4e7',
				'text-secondary': '#a1a1aa',
				'text-tertiary': '#71717a',
				// Accent colors
				'accent-primary': '#3b82f6',
				'accent-hover': '#60a5fa',
				// Semantic colors
				'profit': '#22c55e',
				'loss': '#ef4444',
				'warning': '#f59e0b',
				'info': '#06b6d4',
				// Border colors (using rgba in CSS variables)
			},
			borderRadius: {
				sm: '8px',
				md: '12px',
				lg: '16px',
				xl: '24px',
				full: '9999px',
			},
			fontFamily: {
				sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
				display: ['Outfit', 'Inter', 'sans-serif'],
				mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
			},
			fontSize: {
				'hero': ['48px', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
				'h1': ['36px', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
				'h2': ['24px', { lineHeight: '1.3' }],
				'h3': ['20px', { lineHeight: '1.3' }],
				'body-lg': ['18px', { lineHeight: '1.6' }],
				'body': ['16px', { lineHeight: '1.5' }],
				'small': ['14px', { lineHeight: '1.5', letterSpacing: '0.01em' }],
			},
			spacing: {
				'1': '4px',
				'2': '8px',
				'3': '12px',
				'4': '16px',
				'6': '24px',
				'8': '32px',
				'10': '40px',
				'12': '48px',
				'16': '64px',
				'20': '80px',
			},
			boxShadow: {
				'glow-card': '0 0 0 1px rgba(255,255,255,0.1), 0 4px 12px rgba(0,0,0,0.5)',
				'glow-card-hover': '0 0 0 1px rgba(255,255,255,0.15), 0 8px 24px rgba(0,0,0,0.6)',
				'glow-accent': '0 0 20px rgba(59,130,246,0.5), 0 0 40px rgba(59,130,246,0.3)',
				'glow-profit': '0 0 16px rgba(34,197,94,0.4)',
				'glow-loss': '0 0 16px rgba(239,68,68,0.4)',
			},
			transitionDuration: {
				'fast': '150ms',
				'base': '250ms',
				'slow': '400ms',
				'data': '800ms',
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
			},
			keyframes: {
				'accordion-down': {
					from: { height: 0 },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: 0 },
				},
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
}