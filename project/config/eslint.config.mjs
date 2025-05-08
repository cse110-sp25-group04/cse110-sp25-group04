import { defineConfig } from "eslint/config";
import { globals } from "globals";
import { parser } from "@typescript-eslint/parser";
import { tseslint } from "@typescript-eslint/eslint-plugin";


export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: globals.browser },
    languageOptions: {
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
          selector: ['class', 'typeLike'],
          format: ['PascalCase'],
        },
      ],

      'no-arrow-function': 'error',
      'space-before-function-paren': ['error', {
        'anonymous': 'always',
        'named': 'never',
      }],
      'no-magic-numbers': ['error', {
        ignore: [0, 1],
        detectObjects: false,
      }],
      'comma-style': ['error', 'last'],
      'no-multi-spaces': ['error', {
        exceptions: {
          Property: true,
        },
      }],
      'space-in-parens': ['error', 'never'],
      'space-before-block': ['error', 'always'],
    }
  },
]);
