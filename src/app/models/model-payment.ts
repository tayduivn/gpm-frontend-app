export interface ModelPayment {
  stripe_secret_token: string;
  stripe_publishable_token: string;
  production_stripe: string;
  paypal_token: string;
  production_paypal: string;
}
