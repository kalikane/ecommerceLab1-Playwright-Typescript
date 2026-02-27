import { Page, Locator, expect, } from '@playwright/test';
import { BasePage } from './BasePage';
import { ShippingData, PaymentData } from '../types';

// SRP : responsabilité unique — gérer les étapes du tunnel de commande (livraison + paiement)
// ISP : ShippingData et PaymentData sont des interfaces distinctes et indépendantes
export class CheckoutPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // --- Étape 1 : Livraison ---

  async fillShippingForm(data: ShippingData): Promise<void> {
    console.log('Debut fillShippingForm');
    await expect(this.page.getByText('Adresse de livraison')).toBeVisible();

    await this.getByTestId('shipping-firstname-input').click();
     await this.getByTestId('shipping-firstname-input').fill(data.firstName);
    await this.getByTestId('shipping-lastname-input').fill(data.lastName);
    await this.getByTestId('shipping-email-input').fill(data.email);
    await this.getByTestId('shipping-phone-input').fill(data.phone);
    await this.getByTestId('shipping-address-input').fill(data.address);
    await this.getByTestId('shipping-city-input').fill(data.city);
    await this.getByTestId('shipping-postalcode-input').fill(data.postalCode);
  }

  async submitShipping(): Promise<void> {
    console.log('Debut submitShipping');
    await this.getByTestId('shipping-submit-button').click();
  }

  async completeShipping(data: ShippingData): Promise<void> {
    console.log('Debut completeShipping');
    await this.fillShippingForm(data);
    await this.submitShipping();
  }

  // --- Étape 2 : Paiement ---

  async fillPaymentForm(data: PaymentData): Promise<void> {
    console.log('Debut fillPaymentForm');
    await expect(this.page.getByText('Paiement sécurisé')).toBeVisible();

    await this.getByTestId('payment-cardnumber-input').fill(data.cardNumber);
    await this.getByTestId('payment-cardname-input').fill(data.cardName);
    await this.getByTestId('payment-expiry-input').fill(data.expiry);
    await this.getByTestId('payment-cvv-input').fill(data.cvv);
  }

  async submitPayment(): Promise<void> {
    console.log('Debut submitPayment');
    await this.getByTestId('payment-submit-button').click();
  }

  async completePayment(data: PaymentData): Promise<void> {
    console.log('Debut completePayment');
    await this.fillPaymentForm(data);
    await this.submitPayment();
  }

  // --- Locators pour les assertions de validation ---

  // Bouton toujours visible = formulaire non soumis (validation échouée)
  shippingSubmitButton(): Locator {
    console.log('Debut shippingSubmitButton');
    return this.getByTestId('shipping-submit-button');
  }

  paymentSubmitButton(): Locator {
    console.log('Debut paymentSubmitButton');
    return this.getByTestId('payment-submit-button');
  }

}
