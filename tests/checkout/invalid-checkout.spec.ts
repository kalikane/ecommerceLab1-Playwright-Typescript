import { test, expect } from '../../fixtures/pages.fixture';
import { shippingData, invalidPaymentData } from '../../fixtures/test-data';

// La session est injectée via storageState (project "authenticated").
// L'auth gate n'apparaît pas : l'utilisateur arrive directement sur le formulaire de livraison.
test.describe('checkout avec données invalides', () => {
  test.beforeEach(async ({ productsPage, productDetailPage, cartPage }) => {
    await productsPage.navigate();
    await productsPage.clickProduct(1);
    await productDetailPage.addToCart();
    await cartPage.open();
    await cartPage.proceedToCheckout();
  });

  test('soumission du formulaire de livraison vide — les champs requis bloquent la progression', async ({
    checkoutPage,
  }) => {
    await checkoutPage.submitShipping();

    // Le bouton est toujours visible : la validation a bloqué la soumission
    await expect(checkoutPage.shippingSubmitButton()).toBeVisible();

  
  });

  test('soumission avec numéro de carte invalide — le paiement est refusé', async ({
    checkoutPage,
  }) => {
    await checkoutPage.completeShipping(shippingData);
    await checkoutPage.completePayment(invalidPaymentData);

    // Le bouton est toujours visible : la validation a bloqué la soumission
    await expect(checkoutPage.paymentSubmitButton()).toBeVisible();
   
  });
});
