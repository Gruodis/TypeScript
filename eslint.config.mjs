// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals'; // Import the globals package

const config = {
    ...eslint.configs.recommended, // Extend the recommended config
    languageOptions: {
        // Use languageOptions.globals
        globals: {
            ...globals.browser,
        },
    },
    // Add other configuration options if needed (e.g., parserOptions, plugins, rules)
};

export default tseslint.config(config, ...tseslint.configs.recommended);
