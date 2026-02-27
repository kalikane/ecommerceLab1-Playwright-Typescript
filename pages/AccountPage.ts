import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

// SRP : responsabilité unique — consulter l'historique des commandes du compte
export class AccountPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async goToOrders(): Promise<void> {
    await this.getByTestId('account-tab-orders').click();
  }

  async assertOrderVisible(orderId: string): Promise<void> {
    await expect(this.getByTestId(`account-order-toggle-${orderId}`)).toBeVisible();
  }

  async expandOrder(orderId: string): Promise<void> {
    await this.getByTestId(`account-order-toggle-${orderId}`).click();
  }

  async assertShippingAddressVisible(address: string): Promise<void> {
    await expect(this.page.getByText(address)).toBeVisible();
  }
}
