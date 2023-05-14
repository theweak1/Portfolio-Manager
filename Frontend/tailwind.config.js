/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				darkGrey: '#313233',
				grey: '#686b71',
				lightGrey: '#a8aaad',
				white: '#f0f0f0',
				yellow: '#ffdc48'
			},
			spacing: {
				90: '40rem'
			}
		},
		plugins: []
	}
};
