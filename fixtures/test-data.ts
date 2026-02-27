import { LoginData, ShippingData, PaymentData } from '../types';
import { TestDataGenerator } from '../utils/helpers';

export const shippingData: ShippingData = {
  firstName: 'ingenieur',
  lastName: 'qa',
  email: 'ingenieurqa5@gmail.com',
  phone: '4584568796',
  address: '4085 Rue bernard',
  city: 'Montreal',
  postalCode: 'H0H 0H0',
};

// Généré à la volée : email unique par run (timestamp), mot de passe aléatoire 12 chars
export const signupData = TestDataGenerator.generateSignupData(shippingData);

export const loginData: LoginData = {
  email: signupData.email,
  password: signupData.password,
};

export const paymentData: PaymentData = {
  cardNumber: '4242424242424242',
  cardName: 'Ingenieur QA',
  expiry: '12/29',
  cvv: '708',
};

export const invalidPaymentData: PaymentData = {
  cardNumber: '',
  cardName: 'Test Invalid',
  expiry: '01/20',
  cvv: '000',
};

// IDs des produits ajoutés au panier dans le scénario de référence
export const CART_PRODUCTS = {
  addToCart: [1, 9, 6],
  viewOnly: [12],
};
