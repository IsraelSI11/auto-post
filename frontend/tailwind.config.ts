/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

export default {
	darkMode: ["class"],
	content: [
	"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
	"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
	"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
	extend: {
		colors: {
			background: 'hsl(var(--background))',
			foreground: 'hsl(var(--foreground))',
			charcoal: 'var(--charcoal)',
			'persian-green': 'var(--persian-green)',
			saffron: 'var(--saffron)',
			'sandy-brown': 'var(--sandy-brown)',
			'burnt-sienna': 'var(--burnt-sienna)',
			'antiflash-white': '#e7ecef',
			'yinmn-blue': '#274c77',
			'air-superiority-blue': '#488DDD',
			'uranian-blue': '#a3cef1',
			'battleship-gray': '#8b8c89',
			card: {
				DEFAULT: 'hsl(var(--card))',
				foreground: 'hsl(var(--card-foreground))'
			},
			popover: {
				DEFAULT: 'hsl(var(--popover))',
				foreground: 'hsl(var(--popover-foreground))'
			},
			primary: {
				DEFAULT: 'hsl(var(--primary))',
				foreground: 'hsl(var(--primary-foreground))'
			},
			secondary: {
				DEFAULT: 'hsl(var(--secondary))',
				foreground: 'hsl(var(--secondary-foreground))'
			},
			muted: {
				DEFAULT: 'hsl(var(--muted))',
				foreground: 'hsl(var(--muted-foreground))'
			},
			accent: {
				DEFAULT: 'hsl(var(--accent))',
				foreground: 'hsl(var(--accent-foreground))'
			},
			destructive: {
				DEFAULT: 'hsl(var(--destructive))',
				foreground: 'hsl(var(--destructive-foreground))'
			},
			border: 'hsl(var(--border))',
			input: 'hsl(var(--input))',
			ring: 'hsl(var(--ring))',
			chart: {
				'1': 'hsl(var(--chart-1))',
				'2': 'hsl(var(--chart-2))',
				'3': 'hsl(var(--chart-3))',
				'4': 'hsl(var(--chart-4))',
				'5': 'hsl(var(--chart-5))'
			}
		},
		borderRadius: {
			lg: 'var(--radius)',
			md: 'calc(var(--radius) - 2px)',
			sm: 'calc(var(--radius) - 4px)'
		}
	}
  },
  plugins: [require("tailwindcss-animate"),
	plugin(function({ addUtilities }) {
		addUtilities({
		  '.no-scrollbar::-webkit-scrollbar': {
			'display': 'none',
		  },
		  '.no-scrollbar': {
			'-ms-overflow-style': 'none',
			'scrollbar-width': 'none',
		  },
		  '.styled-scrollbar::-webkit-scrollbar': {
			'width': '10px',
		  },
		  '.styled-scrollbar::-webkit-scrollbar-track': {
			'background': 'transparent',
		  },
		  '.styled-scrollbar::-webkit-scrollbar-thumb': {
			'background': '#888',
			'border-radius': '10px',
		  },
		  '.styled-scrollbar::-webkit-scrollbar-thumb:hover': {
			'background': '#555',
		  },
		})
	  })
  ],
} satisfies Config;
