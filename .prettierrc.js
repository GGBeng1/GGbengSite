module.exports = {
	useTabs: true,
	semi: true,
	singleQuote: true,
	arrowParens: 'avoid',
	plugins: [require.resolve('prettier-plugin-astro')],
	overrides: [
		{
			files: '**/*.astro',
			options: { parser: 'astro' },
		},
	],
};
