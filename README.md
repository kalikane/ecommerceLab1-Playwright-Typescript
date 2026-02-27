# ecommerceLab1-Playwright-Typescript

Framework d'automatisation de tests end-to-end pour un site e-commerce, construit avec **Playwright** et **TypeScript** en suivant le pattern **Page Object Model** et les principes **SOLID**.

---

## Application sous test

**TechHub** — site e-commerce développé par [Matthieu Bridoux](https://www.linkedin.com/in/matthieubridoux/)

> https://techhubecommerce.lovable.app

Le parcours couvert comprend la navigation produits, la gestion du panier, l'inscription, le tunnel de commande complet (livraison + paiement) et la vérification de l'historique des commandes.

---

## Stack technique

| Outil | Rôle |
|---|---|
| [Playwright](https://playwright.dev/) `^1.58` | Moteur de tests e2e — interactions navigateur, assertions, gestion de session |
| [TypeScript](https://www.typescriptlang.org/) `^5.9` | Typage strict, interfaces, classes |
| [Allure](https://allurereport.org/) `^3.5` | Rapport de tests interactif |
| [ESLint](https://eslint.org/) `^10` + `typescript-eslint` + `eslint-plugin-playwright` | Qualité et cohérence du code |
| [GitHub Actions](https://github.com/features/actions) | Pipeline CI/CD : exécution des tests + déploiement du rapport |

---

## Architecture du projet

```
ecommerceLab1-Playwright-Typescript/
│
├── pages/                     # Page Objects — une classe par page/composant
│   ├── BasePage.ts            # Classe abstraite partagée (getByTestId, waitForLoad)
│   ├── ProductsPage.ts        # Catalogue produits : navigate(), clickProduct()
│   ├── ProductDetailPage.ts   # Détail produit : addToCart(), goBack()
│   ├── CartPage.ts            # Tiroir panier : open(), increaseQuantity(), removeItem()
│   ├── AuthPage.ts            # Auth : openAuth(), login(), signup()
│   ├── CheckoutPage.ts        # Tunnel commande : fillShippingForm(), fillPaymentForm()
│   ├── OrderConfirmationPage.ts  # Confirmation : assertOrderConfirmed(), getOrderId()
│   └── AccountPage.ts         # Compte : goToOrders(), assertOrderVisible()
│
├── tests/                     # Fichiers de tests Playwright
│   ├── global-setup.spec.ts   # Création du compte + persistance de session (storageState)
│   ├── purchase-flow.spec.ts  # Parcours complet e2e (project: unauthenticated)
│   ├── cart/
│   │   ├── add-product.spec.ts     # Ajout d'un produit au panier
│   │   ├── remove-product.spec.ts  # Suppression d'un produit
│   │   └── update-quantity.spec.ts # Modification des quantités
│   └── checkout/
│       └── invalid-checkout.spec.ts  # Validation des formulaires (données invalides)
│
├── fixtures/
│   ├── pages.fixture.ts       # Extension de test.extend — injection des Page Objects
│   └── test-data.ts           # Données de test : shippingData, paymentData, signupData
│
├── types/
│   └── index.ts               # Interfaces TypeScript : SignupData, ShippingData, PaymentData…
│
├── utils/
│   └── helpers.ts             # TestDataGenerator — génération d'email unique et mot de passe
│
├── playwright.config.ts       # Configuration Playwright : 3 projects, reporters HTML + Allure
├── tsconfig.json              # Mode strict TypeScript
├── eslint.config.mjs          # Règles ESLint TypeScript + Playwright
└── .github/workflows/
    └── playwright.yml         # Pipeline CI/CD GitHub Actions
```

---

## Patterns et principes

### Page Object Model (POM)
Chaque page de l'application est représentée par une classe TypeScript dédiée. Les tests n'interagissent jamais directement avec les sélecteurs — ils passent par les méthodes des Page Objects. Cela rend les tests lisibles et les sélecteurs centralisés.

### Principes SOLID

| Principe | Application |
|---|---|
| **S** — Single Responsibility | Chaque classe gère une seule page ou composant |
| **O** — Open/Closed | `BasePage` est extensible sans modification |
| **L** — Liskov Substitution | Toute sous-classe peut remplacer `BasePage` sans effet de bord |
| **I** — Interface Segregation | `ShippingData`, `PaymentData`, `SignupData` sont des interfaces distinctes |
| **D** — Dependency Inversion | Les pages dépendent de l'abstraction `Page` de Playwright |

### Playwright Fixtures (`test.extend`)
Le fichier `fixtures/pages.fixture.ts` étend `test` de Playwright pour injecter automatiquement tous les Page Objects dans chaque test. Les instances sont créées à la demande et leur cycle de vie est géré par Playwright.

```typescript
// Chaque Page Object est injecté comme paramètre nommé
test('mon test', async ({ productsPage, cartPage, checkoutPage }) => {
  await productsPage.navigate();
  // ...
});
```

### Authentification avec `storageState`
Le projet utilise trois **projects** Playwright :

| Project | Rôle |
|---|---|
| `setup` | Crée le compte utilisateur et sauvegarde la session dans `playwright/.auth/user.json` |
| `authenticated` | Charge la session via `storageState` — les tests panier et checkout ne repassent pas par l'auth |
| `unauthenticated` | Pas de session — le parcours complet (avec inscription) |

---

## Exécuter les tests

### Pré-requis

```bash
npm ci
npx playwright install chromium
```

### Lancer tous les tests

```bash
npx playwright test
```

### Lancer un project spécifique

```bash
npx playwright test --project=authenticated
npx playwright test --project=unauthenticated
```

### Lancer un fichier de test

```bash
npx playwright test tests/cart/add-product.spec.ts
```

### Mode headed (navigateur visible)

```bash
npm run test:headed
```

---

## Rapport Allure

### Générer et ouvrir en local

```bash
npm run allure:run
```

Ou étape par étape :

```bash
npm run allure:generate   # compile allure-results/ → allure-report/
npm run allure:open       # ouvre le rapport dans le navigateur
```

### Rapport en ligne (GitHub Pages)

Le rapport du dernier run CI est disponible à :

**https://kalikane.github.io/ecommerceLab1-Playwright-Typescript**

---

## Pipeline CI/CD

Le workflow `.github/workflows/playwright.yml` se déclenche sur chaque **push** et **pull request** vers `main`.

```
push / pull_request → main
         │
         ▼
    ┌─────────────────────────────────────────────┐
    │  job: test                                  │
    │  • Setup Node 20 + Java 21                  │
    │  • npm ci                                   │
    │  • playwright install chromium              │
    │  • npx playwright test                      │
    │  • npm run allure:generate  (if: always)    │
    │  • upload-artifact allure-report            │
    └───────────────────┬─────────────────────────┘
                        │ needs: test (if: always)
                        ▼
    ┌─────────────────────────────────────────────┐
    │  job: deploy → GitHub Pages                 │
    │  • download-artifact allure-report          │
    │  • upload-pages-artifact                    │
    │  • deploy-pages                             │
    └─────────────────────────────────────────────┘
```

Le rapport Allure est déployé même en cas d'échec de tests (`if: always()`), ce qui permet de consulter les résultats directement depuis GitHub Pages.
