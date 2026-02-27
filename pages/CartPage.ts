import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

// SRP : responsabilité unique — gérer le panier (tiroir accessible depuis n'importe quelle page)
// LSP : étend BasePage sans altérer le comportement hérité
export class CartPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async open(): Promise<void> {
    await expect(this.getByTestId('cart-button')).toBeVisible();
    await this.getByTestId('cart-button').click();
  }

  async increaseQuantity(productId: number): Promise<void> {
    await this.getByTestId(`increase-quantity-${productId}`).click();
  }

  async decreaseQuantity(productId: number): Promise<void> {
    await this.getByTestId(`decrease-quantity-${productId}`).click();
  }

  async removeItem(productId: number): Promise<void> {
    await this.getByTestId(`remove-item-${productId}`).click();
  }

  async proceedToCheckout(): Promise<void> {
    await this.getByTestId('checkout-button').click();
  }

  // --- Locators pour les assertions dans les tests ---

  // remove-item-{id} sert de proxy : visible ↔ article présent dans le panier
  cartItem(productId: number): Locator {
    return this.getByTestId(`remove-item-${productId}`);
  }

  itemQuantity(productId: number): Locator {
    return this.getByTestId(`quantity-${productId}`);
  }

  emptyCartState(): Locator {
    return this.page.getByText('Votre panier est vide');
  }
}
