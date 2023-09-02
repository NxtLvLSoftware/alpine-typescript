const tailwind = require('tailwindcss');

module.exports = {
	plugins: [
		'postcss-preset-env',
		tailwind('tailwind.config.js'),
		require('autoprefixer'),
		require('cssnano')
	]
};
