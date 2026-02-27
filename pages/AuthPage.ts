import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { LoginData, SignupData } from '../types';

// SRP : responsabilité unique — gérer l'authentification (connexion / inscription)
// ISP : consomme LoginData ou SignupData selon l'action, pas un objet monolithique
export class AuthPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // --- Points d'entrée ---

  // Depuis la navbar (disponible sur toutes les pages)
  async openAuth(): Promise<void> {
    await this.getByTestId('login-button').click();
  }

  // Depuis la page de checkout (auth gate)
  async openAuthModal(): Promise<void> {
    await this.getByTestId('checkout-login-button').click();
  }

  // --- Onglet Connexion ---

  async fillLoginForm(data: LoginData): Promise<void> {
    await this.getByTestId('login-email-input').fill(data.email);
    await this.getByTestId('login-password-input').fill(data.password);
  }

  async submitLogin(): Promise<void> {
    await this.getByTestId('login-submit-button').click();
  }

  async login(data: LoginData): Promise<void> {
    await this.openAuthModal();
    await this.fillLoginForm(data);
    await this.submitLogin();
  }

  // --- Onglet Inscription ---

  async switchToSignup(): Promise<void> {
    await this.getByTestId('signup-tab').click();
  }

  async fillSignupForm(data: SignupData): Promise<void> {
    await this.getByTestId('signup-name-input').fill(data.name);
    await this.getByTestId('signup-email-input').fill(data.email);
    await this.getByTestId('signup-password-input').fill(data.password);
    await this.getByTestId('signup-confirm-password-input').fill(data.password);
  }

  async submitSignup(): Promise<void> {
    await this.getByTestId('signup-submit-button').click();
  }

  async signup(data: SignupData): Promise<void> {
    await this.openAuthModal();
    await this.switchToSignup();
    await this.fillSignupForm(data);
    await this.submitSignup();
  }
}
