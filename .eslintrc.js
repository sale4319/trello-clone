module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'plugin:unicorn/recommended', // best linting plugin by the best OSS Dev--> https://github.com/sindresorhus/eslint-plugin-unicorn
        'plugin:react/recommended',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
    ],
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    rules: {
        'react/prop-types': 'off',
        'unicorn/no-useless-undefined': 'off',
        'unicorn/no-null': 'off',
        'unicorn/prefer-query-selector': 'off',
        'unicorn/no-array-for-each': 'off',
        'unicorn/filename-case': [
            'error',
            {
                cases: {
                    camelCase: true,
                    pascalCase: true,
                },
            },
        ],
        'unicorn/prevent-abbreviations': [
            'error',
            {
                replacements: {
                    props: {
                        properties: false,
                    },
                },
            },
        ],
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};