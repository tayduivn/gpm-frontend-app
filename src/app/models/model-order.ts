import {ModelProduct} from './model-product';

export interface ModelOrder {
  phone?: any;
  postal_code?: any;
  country_code?: any;
  country?: any;
  state?: any;
  city?: any;
  address?: any;
  last_name?: any;
  first_name?: any;
  chat_id?: any;
  order_inserted_at?: string;
  email?: string;
  order_id?: string;
  id?: string;
  subtotal?: string;
  total?: string;
  user_id?: string;
  cart_id?: string;
  transaction_id?: string;
  order_status?: string;
  products?: [ModelProduct];
}
