import path from 'path';
import { expect, test } from '../fixtures/pages.fixture';
import { signupData } from '../fixtures/test-data';

// Chemin résolu depuis la racine du projet (tests/ → ../)
const AUTH_FILE = path.resolve(__dirname, '..', 'playwright', '.auth', 'user.json');

// Ce test s'exécute une seule fois dans le project "setup".
// Il crée le compte utilisateur et persiste la session dans AUTH_FILE.
// Les projects qui déclarent `dependencies: ['setup']` rechargent cette session
// via `storageState` sans repasser par l'UI d'inscription.
// eslint-disable-next-line playwright/expect-expect -- setup : persistance de session, pas d'assertion UI
test('créer le compte et sauvegarder la session', async ({
  page,
  productsPage,
  authPage,
}) => {
  // Ouvrir le modal d'auth directement depuis la navbar
  await productsPage.navigate();
  await authPage.openAuth();
  await authPage.switchToSignup();
  await authPage.fillSignupForm(signupData);
  await authPage.submitSignup();

  // Wait for the final URL to ensure that the cookies are actually set.
  await expect(page.getByText('La technologie qui simplifie votre quotidien').first()).toBeVisible();

  // Sauvegarder cookies + localStorage pour les tests authentifiés
  await page.context().storageState({ path: AUTH_FILE });
});
