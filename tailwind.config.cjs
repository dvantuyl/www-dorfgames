const colors = require('tailwindcss/colors');

const config = {
	mode: 'jit',
	purge: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			...colors
		},
		extend: {}
	},
	plugins: [require('@tailwindcss/aspect-ratio')]
};

module.exports = config;
