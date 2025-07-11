import { fixupPluginRules } from '@eslint/compat';
import js from '@eslint/js';
import gitignore from 'eslint-config-flat-gitignore';
import prettierConfig from 'eslint-config-prettier';
import reactPlugin from 'eslint-plugin-react';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  gitignore(),
  js.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: { ...globals.browser, ...globals.node, ...globals.es2020 },
    },
    rules: {
      eqeqeq: 'error',
      'no-param-reassign': 'error',
      'object-shorthand': ['error', 'always'],
      'prefer-template': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      // complexity: ['error', 5],
      // 'max-depth': ['error', 2],
      // 'max-nested-callbacks': ['error', 3],
      // 'max-lines': ['error', 200],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    files: ['**/*.tsx'],
    plugins: {
      react: reactPlugin,
      // eslint-disable-next-line @typescript-eslint/no-require-imports,@typescript-eslint/no-unsafe-argument
      'react-hooks': fixupPluginRules(require('eslint-plugin-react-hooks')),
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/no-unnecessary-condition': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      'react/self-closing-comp': 'error',
      'react-hooks/rules-of-hooks': 'off',
      'react-hooks/exhaustive-deps': 'error',
    },
  },
  {
    ignores: ['src/generated/prisma/**'],
  },
  prettierConfig,
);
