import { ShippingData, SignupData } from '../types';

const ALPHANUM = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export class TestDataGenerator {
  static generateSignupData(shippingData: ShippingData): SignupData {
    const name = `${shippingData.firstName} ${shippingData.lastName}`;
    const email = `qa.test+${Date.now()}@gmail.com`;
    const password = Array.from(
      { length: 12 },
      () => ALPHANUM[Math.floor(Math.random() * ALPHANUM.length)]
    ).join('');

    return { name, email, password };
  }
}
