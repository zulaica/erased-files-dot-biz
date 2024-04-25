import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.browser,
        ...globals.node
      },
      sourceType: 'module'
    },
    rules: {
      'no-var': 'error'
    }
  },
  eslintConfigPrettier,
  eslintPluginPrettierRecommended
];
