import { test, expect } from '../../fixtures/pages.fixture';

test('supprimer le produit 1 du panier et vérifier que le panier est vide', async ({
  productsPage,
  productDetailPage,
  cartPage,
}) => {
  await productsPage.navigate();
  await productsPage.clickProduct(1);
  await productDetailPage.addToCart();

  await cartPage.open();
  await expect(cartPage.cartItem(1)).toBeVisible();

  await cartPage.removeItem(1);

  await expect(cartPage.cartItem(1)).toBeHidden();
  await expect(cartPage.emptyCartState()).toBeVisible();
});
