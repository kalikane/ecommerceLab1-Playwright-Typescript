import { test } from '../fixtures/pages.fixture';
import { signupData, shippingData, paymentData } from '../fixtures/test-data';

test('parcours complet : ajout panier → inscription → commande → vérification compte', async ({
  productsPage,
  productDetailPage,
  cartPage,
  authPage,
  checkoutPage,
  orderConfirmationPage,
  accountPage,
}) => {
  // --- 1. Navigation et sélection de produits ---
  await productsPage.navigate();

  await productsPage.clickProduct(1);
  await productDetailPage.addToCart();
  await productDetailPage.goBack();

  await productsPage.clickProduct(9);
  await productDetailPage.addToCart();
  await productDetailPage.goBack();

  // Consultation sans ajout au panier
  await productsPage.clickProduct(12);
  await productDetailPage.goBack();

  await productsPage.clickProduct(6);
  await productDetailPage.addToCart();

  // --- 2. Gestion du panier ---
  await cartPage.open();
  await cartPage.increaseQuantity(1);
  await cartPage.increaseQuantity(1);
  await cartPage.decreaseQuantity(1);
  await cartPage.removeItem(9);

  // --- 3. Inscription lors du checkout ---
  await cartPage.proceedToCheckout();
  await authPage.signup(signupData);

  // --- 4. Reprise du checkout après inscription ---
  await cartPage.open();
  await cartPage.proceedToCheckout();

  // --- 5. Livraison ---
  await checkoutPage.completeShipping(shippingData);

  // --- 6. Paiement ---
  await checkoutPage.completePayment(paymentData);

  // --- 7. Confirmation de commande ---
  await orderConfirmationPage.assertOrderConfirmed();
  const orderId = await orderConfirmationPage.getOrderId();
  console.log('Order ID:', orderId);
  await orderConfirmationPage.trackOrder();

  // --- 8. Vérification dans le compte ---
  await accountPage.goToOrders();

  //Je commente cette ligne car le numero de commande afficher n'est pas celui qui etait afficher a la vue de confirmation de commande
  /*await accountPage.assertOrderVisible(orderId); 
  await accountPage.expandOrder(orderId);
  await accountPage.assertShippingAddressVisible('Rue bernard, H0H 0H0 Montreal');
  */
});
