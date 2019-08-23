export interface ModelTransaction {
  subtotal?: any;
  total?: any;
  user_id?: string | any;
  cart_id?: string | any;
  id?: string;
  code?: string;
  processor?: string;
  processor_trans_id?: number;
  cc_num?: string;
  cc_type?: string;
  start_date?: string;
  end_date?: string;
  token_stripe?: any;
  payload_paypal?: string;
  type_payment?: string;
  quantity?: any;
  product_id?: any;
}
