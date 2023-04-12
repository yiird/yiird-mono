require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
	root: true,
	env: {
		browser: true,
		node: true
	},
	//eslintIgnore: ['/dist/', '/node_modules/'],
	parser: 'vue-eslint-parser',
	parserOptions: {
		ecmaVersion: 'latest'
	},
	extends: [
		'plugin:vue/vue3-essential',
		'eslint:recommended',
		'@vue/eslint-config-typescript',
		'@vue/eslint-config-prettier/skip-formatting'
	],
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'prettier/prettier': ['error'],
		'vue/multi-word-component-names': 'off',
		'vue/html-closing-bracket-newline': [
			'error',
			{
				singleline: 'never',
				multiline: 'never'
			}
		],
		'vue/max-attributes-per-line': 'off'
	},
	overrides: [
		{
		  files: [
			'packages/*/cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}'
		  ],
		  'extends': [
			'plugin:cypress/recommended'
		  ]
		}
	  ]
};
