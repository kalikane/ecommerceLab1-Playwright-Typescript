import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

// SRP : responsabilité unique — vérifier la confirmation de commande et lancer le suivi
export class OrderConfirmationPage extends BasePage {
  readonly heading: Locator;
  readonly confirmationCard: Locator;
  readonly orderNumber: Locator;
  readonly mainContent: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.locator('h1');
    this.confirmationCard = this.getByTestId('order-confirmation-card');
    this.orderNumber = this.getByTestId('order-number');
    this.mainContent = page.getByRole('main');
  }

  async assertOrderConfirmed(): Promise<void> {
    await expect(this.heading).toContainText('Commande confirmée !');
    await expect(this.confirmationCard).toContainText('Numéro de commande');
    await expect(this.orderNumber).toBeVisible();
    await expect(this.mainContent).toContainText(
      'Merci pour votre commande. Vous recevrez un email de confirmation avec les détails de votre livraison.'
    );
  }

  async getOrderId(): Promise<string> {
    return await this.orderNumber.innerText();
  }

  async trackOrder(): Promise<void> {
    await this.getByTestId('track-order-button').click();
  }
}
