import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

// SRP : responsabilité unique — interagir avec la page de détail d'un produit
export class ProductDetailPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async addToCart(): Promise<void> {
    await this.getByTestId('product-detail-add-to-cart').click();
  }

  async goBack(): Promise<void> {
    await this.getByTestId('product-detail-back-link').click();
  }
}
