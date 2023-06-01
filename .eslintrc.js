require('@rushstack/eslint-patch/modern-module-resolution');

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
    extends: ['plugin:vue/vue3-essential', 'plugin:vue/vue3-recommended', 'eslint:recommended', '@vue/eslint-config-typescript', '@vue/eslint-config-prettier/skip-formatting'],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'prettier/prettier': ['error'],
        'vue/html-closing-bracket-newline': [
            'error',
            {
                multiline: 'never'
            }
        ],
        'vue/max-attributes-per-line': 'off',
        'vue/multiline-html-element-content-newline': ['error'],
        'vue/html-indent': [
            'error',
            4,
            {
                attribute: 1,
                baseIndent: 1,
                closeBracket: 0,
                alignAttributesVertically: true,
                ignores: []
            }
        ],
        'vue/multi-word-component-names': 'off',
        'vue/no-reserved-component-names': 'off',
        'vue/attributes-order': [
            'error',
            {
                order: [
                    'DEFINITION',
                    'LIST_RENDERING',
                    'CONDITIONALS',
                    'RENDER_MODIFIERS',
                    'GLOBAL',
                    ['UNIQUE', 'SLOT'],
                    'TWO_WAY_BINDING',
                    'OTHER_DIRECTIVES',
                    'ATTR_DYNAMIC',
                    'ATTR_STATIC',
                    'ATTR_SHORTHAND_BOOL',
                    'EVENTS',
                    'CONTENT'
                ],
                alphabetical: false
            }
        ]
    },
    overrides: [
        {
            files: ['packages/*/cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}'],
            extends: ['plugin:cypress/recommended']
        }
    ]
};
