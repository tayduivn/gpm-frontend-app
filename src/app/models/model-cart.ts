import {ModelProduct} from './model-product';

export interface ModelCart {
  cart_id: any;
  products: [ModelProduct];
  id: string;
  user_id: string;
  status: string;
}
