/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
	  './pages/**/*.{ts,tsx}',
	  './components/**/*.{ts,tsx}',
	  './app/**/*.{ts,tsx}',
	  './src/**/*.{ts,tsx}',
	],
	theme: {
	  container: {
		center: 'true',
		padding: '2rem',
		screens: {
		  '2xl': '1400px'
		}
	  },
	  extend: {
		colors: {
		  // Existing colors
		  border: 'hsl(var(--border))',
		  input: 'hsl(var(--input))',
		  ring: 'hsl(var(--ring))',
		  background: 'hsl(var(--background))',
		  foreground: 'hsl(var(--foreground))',
		  primary: {
			DEFAULT: 'hsl(var(--primary))',
			foreground: 'hsl(var(--primary-foreground))'
		  },
		  secondary: {
			DEFAULT: 'hsl(var(--secondary))',
			foreground: 'hsl(var(--secondary-foreground))'
		  },
		  // Custom colors for project status
		  intake: {
			DEFAULT: '#3B82F6', // bg-blue-500
			hover: '#60A5FA',   // bg-blue-400
			text: '#FFFFFF'     // text-white
		  },
		  newRequest: {
			DEFAULT: '#F59E0B', // bg-yellow-500
			hover: '#FBBF24',   // bg-yellow-400
			text: '#FFFFFF'     // text-white
		  },
		  inProgress: {
			DEFAULT: '#FB923C', // bg-orange-500
			hover: '#FDBA74',   // bg-orange-400
			text: '#FFFFFF'     // text-white
		  },
		  complete: {
			DEFAULT: '#10B981', // bg-green-500
			hover: '#34D399',   // bg-green-400
			text: '#FFFFFF'     // text-white
		  }
		},
		borderRadius: {
		  lg: 'var(--radius)',
		  md: 'calc(var(--radius) - 2px)',
		  sm: 'calc(var(--radius) - 4px)'
		},
		keyframes: {
		  'accordion-down': {
			from: {
			  height: '0'
			},
			to: {
			  height: 'var(--radix-accordion-content-height)'
			}
		  },
		  'accordion-up': {
			from: {
			  height: 'var(--radix-accordion-content-height)'
			},
			to: {
			  height: '0'
			}
		  }
		},
		animation: {
		  'accordion-down': 'accordion-down 0.2s ease-out',
		  'accordion-up': 'accordion-up 0.2s ease-out'
		}
	  }
	},
	plugins: [require("tailwindcss-animate")],
  }
  