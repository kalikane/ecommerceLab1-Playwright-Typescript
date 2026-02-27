import { Page, Locator } from '@playwright/test';

// OCP : classe ouverte à l'extension, fermée à la modification
// DIP : dépend de l'abstraction `Page` de Playwright, pas d'une implémentation concrète
export abstract class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Méthode utilitaire centralisée — évite la duplication dans chaque sous-classe
  protected getByTestId(testId: string): Locator {
    return this.page.getByTestId(testId);
  }

  async waitForLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }
}
