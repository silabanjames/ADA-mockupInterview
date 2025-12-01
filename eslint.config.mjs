import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

// source: https://dev.to/forhad96/-how-to-set-up-eslint-and-prettier-in-a-typescript-project-3pi2

export default [
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      'generated/**',
      'prisma/**',
      'prisma.config.ts',
    ],
  },

  // Config JS dasar
  js.configs.recommended,

  {
    files: ['**/*.ts'],
    ignores: ['dist/**', 'node_modules/**'],

    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },

    plugins: {
      '@typescript-eslint': tseslint,
    },

    rules: {
      // ESLint default rules
      'no-unused-vars': 'off', // disabled, digantikan oleh TS rule
      'no-undef': 'off', // TypeScript sudah handle
      'prefer-const': 'error',
      'no-console': 'warn',

      // TypeScript rules
      '@typescript-eslint/no-unused-vars': 'error',
    },
  },
];
