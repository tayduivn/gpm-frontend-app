import {ModelUser} from './model-user';
import {ModelReview} from './model-review';
import {ModelCategory} from './model-category';

export interface ModelProduct {
  categories?: [ModelCategory];
  currency?: any;
  cart_quantity?: any;
  inserted_at?: string;
  reviews?: [ModelReview];
  id?: string;
  sku?: string;
  name?: string;
  description_short?: string;
  description_one?: string;
  description_two?: string;
  regular_price?: string;
  images?: any;
  quantity?: number;
  user_id?: string;
  size?: string;
  user?: ModelUser;
}
