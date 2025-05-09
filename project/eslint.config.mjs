import globalsPkg from 'globals';
import tseslint from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';

const { GLOBALS } = globalsPkg;

export default [
    {
        files: ['**/*.{js,mjs,cjs}'],
        languageOptions: {
            parser,
            ecmaVersion: 'latest',
            sourceType: 'module',
        },
        plugins: {
            '@typescript-eslint': tseslint,
        },
        rules: {
            semi: ['error', 'always'], // always semicolons
            quotes: ['error', 'single'], // single quotes
            indent: ['error', 4], // 1 tab = 4 spaces indentation

            '@typescript-eslint/naming-convention': [
                'error',
                {
                    selector: ['variable', 'function'],
                    format: ['camelCase'],
                },
                {
                    selector: 'variable',
                    modifiers: ['const', 'global'],
                    format: ['UPPER_CASE'],
                },
                {
                    selector: ['class', 'typeLike'],
                    format: ['PascalCase'],
                },
            ],

            'func-style': [
                'error',
                'declaration',
                { allowArrowFunctions: false },
            ],
            'space-before-function-paren': [
                'error',
                {
                    anonymous: 'always',
                    named: 'never',
                },
            ],
            'comma-style': ['error', 'last'],
            'no-multi-spaces': [
                'error',
                {
                    exceptions: {
                        Property: true,
                    },
                },
            ],
            'space-in-parens': ['error', 'never'],
            'space-before-blocks': ['error', 'always'],
        },
    },
];
