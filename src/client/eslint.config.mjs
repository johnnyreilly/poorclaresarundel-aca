import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginRefresh from 'eslint-plugin-react-refresh';
import pluginHooks from 'eslint-plugin-react-hooks';

/** @type {import('eslint').Linter.Config[]} */
export default [
    { ignores: ['dist'] },
    {
        files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
        settings: {
            react: {
                version: 'detect',
            },
        },
        languageOptions: {
            globals: globals.browser,
        },
    },
    pluginJs.configs.recommended,
    pluginRefresh.configs.recommended,
    pluginReact.configs.flat.recommended,
    ...tseslint.configs.recommended,
    {
        plugins: {
            'react-hooks': pluginHooks,
        },
        rules: {
            'react/react-in-jsx-scope': 'off',
            ...pluginHooks.configs.recommended.rules,
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    args: 'all',
                    argsIgnorePattern: '^_',
                    caughtErrors: 'all',
                    caughtErrorsIgnorePattern: '^_',
                    destructuredArrayIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    ignoreRestSiblings: true,
                },
            ],
            'react-refresh/only-export-components': 'off', // TODO: Remove this rule when it's fixed
        },
    },
];
