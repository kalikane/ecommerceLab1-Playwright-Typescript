// ISP : interfaces granulaires — chaque page ne dépend que de ce dont elle a besoin

export interface SignupData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface ShippingData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
}

export interface PaymentData {
  cardNumber: string;
  cardName: string;
  expiry: string;
  cvv: string;
}
