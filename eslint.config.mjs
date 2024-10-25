// @ts-check

import eslint from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import globals from 'globals';
import prettier from 'eslint-plugin-prettier'; // Import the prettier plugin

const config = {
    ...eslint.configs.recommended,
    languageOptions: {
        parser: tsParser,
        parserOptions: {
            project: './tsconfig.json',
        },
        globals: {
            ...globals.browser,
            process: true,
        },
    },
    ignores: ['src/**/*.js', '*.mjs'],
};

const tsConfig = {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
        '@typescript-eslint': tseslint,
    },
    rules: {
        ...tseslint.configs.recommended.rules,
    },
};

const prettierConfig = {
    plugins: {
        prettier: prettier, // Include the prettier plugin object
    },
    rules: {
        'prettier/prettier': 'warn',
    },
};

export default [config, tsConfig, prettierConfig];
