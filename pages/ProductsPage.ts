import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

// SRP : responsabilité unique — naviguer vers le catalogue et sélectionner un produit
export class ProductsPage extends BasePage {
  readonly url = '/products';

  constructor(page: Page) {
    super(page);
  }

  async navigate(): Promise<void> {
    await this.page.goto(this.url);
    await this.waitForLoad();
  }

  async clickProduct(productId: number): Promise<void> {
    await this.getByTestId(`product-card-${productId}`).click();
  }
}
