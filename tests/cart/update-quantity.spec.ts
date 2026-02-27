import { test, expect } from '../../fixtures/pages.fixture';

test('modifier la quantité du produit 1 dans le panier', async ({
  productsPage,
  productDetailPage,
  cartPage,
}) => {
  await productsPage.navigate();
  await productsPage.clickProduct(1);
  await productDetailPage.addToCart();

  await cartPage.open();

  // Quantité initiale : 1
  await expect(cartPage.itemQuantity(1)).toHaveText('1');

  await cartPage.increaseQuantity(1);
  await expect(cartPage.itemQuantity(1)).toHaveText('2');

  await cartPage.decreaseQuantity(1);
  await expect(cartPage.itemQuantity(1)).toHaveText('1');
});
