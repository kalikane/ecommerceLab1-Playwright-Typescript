import { test, expect } from '../../fixtures/pages.fixture';

test('ajouter le produit 1 au panier et vérifier sa présence', async ({
  productsPage,
  productDetailPage,
  cartPage,
}) => {
  await productsPage.navigate();
  await productsPage.clickProduct(1);
  await productDetailPage.addToCart();

  await cartPage.open();

  await expect(cartPage.cartItem(1)).toBeVisible();
});
