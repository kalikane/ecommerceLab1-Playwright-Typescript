// @ts-check
import tsPlugin from '@typescript-eslint/eslint-plugin';
import playwright from 'eslint-plugin-playwright';

/** @type {import('eslint').Linter.Config[]} */
export default [
  // --- Fichiers ignorés ---
  {
    ignores: ['node_modules/**', 'dist/**', 'playwright-report/**', 'test-results/**'],
  },

  // --- Règles TypeScript recommandées (scoped sur **/*.ts par le plugin) ---
  // flat/recommended est un tableau de 3 configs : parser, règles TS, overrides
  ...tsPlugin.configs['flat/recommended'],

  // --- Règles Playwright recommandées (scoped sur tests et fixtures) ---
  {
    ...playwright.configs['flat/recommended'],
    files: ['tests/**/*.ts', 'fixtures/**/*.ts'],
    rules: {
      ...playwright.configs['flat/recommended'].rules,
      // Les assertions sont encapsulées dans les méthodes POM (assert*)
      'playwright/expect-expect': ['warn', { assertFunctionPatterns: ['^assert'] }],
    },
  },
];
