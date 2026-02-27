import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['allure-playwright', {
      outputFolder: 'allure-results',
      detail: true,
      suiteTitle: true,
    }],
  ],
  use: {
    baseURL: 'https://techhubecommerce.lovable.app',
    trace: 'on-first-retry',
  },

  projects: [
    // -------------------------------------------------------------------
    // 1. SETUP — crée le compte et sauvegarde la session dans .auth/
    //    Tourne en premier, sans storageState.
    // -------------------------------------------------------------------
    {
      name: 'setup',
      testMatch: '**/global-setup.spec.ts',
      use: { ...devices['Desktop Chrome'] },
    },

    // -------------------------------------------------------------------
    // 2. AUTHENTICATED — charge la session issue du setup.
    //    Couvre les tests panier et checkout (qui requièrent un compte).
    // -------------------------------------------------------------------
    {
      name: 'authenticated',
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json',
      },
      testMatch: '**/tests/checkout/**/*.spec.ts',
    },

    // -------------------------------------------------------------------
    // 3. UNAUTHENTICATED — pas de storageState.
    //    Couvre le parcours complet (inscription incluse).
    // -------------------------------------------------------------------
    {
      name: 'unauthenticated',
      use: { ...devices['Desktop Chrome'] },
      testMatch: ['**/tests/cart/**/*.spec.ts','**/tests/purchase-flow.spec.ts'],
    },
  ],
});
