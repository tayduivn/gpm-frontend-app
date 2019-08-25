import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {throwError} from 'rxjs';
import config from '../../config/config';

interface HttpOptions {
  headers: HttpHeaders;
  body?: {};
}

const token = `Bearer ${localStorage.getItem('token')}`;

@Injectable({
  providedIn: 'root'
})
export class HandleRequestService {

  public httpJSONOptions: HttpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? token : '',
    })
  };

  public httpFormOptions: HttpOptions = {
    headers: new HttpHeaders({
      'Authorization': token ? token : '',
    })
  };
  public apiUsers = {
    login: `${config.api_url}/api/public/users/login`,
    email: `${config.api_url}/api/public/users/email`,
    register: `${config.api_url}/api/public/users/register`,
    forgot: `${config.api_url}/api/public/users/forgot`,
    photo: `${config.api_url}/api/users/photo`,
    password: `${config.api_url}/api/users/password`,
    bank: `${config.api_url}/api/users/bank`,
    all: `${config.api_url}/api/users`,
  };
  public apiCategories = {
    all: `${config.api_url}/api/categories`,
    allPublic: `${config.api_url}/api/public/categories`,
  };
  public apiTags = {
    all: `${config.api_url}/api/tags`,
    allPublic: `${config.api_url}/api/public/tags`,
  };
  public apiPayments = {
    all: `${config.api_url}/api/payments`,
    allPublic: `${config.api_url}/api/public/payments`,
    paypal: `${config.api_url}/api/payments/paypal`,
  };
  public apiEmails = {
    all: `${config.api_url}/api/emails`,
    allPublic: `${config.api_url}/api/public/emails`,
  };
  public apiProductsCategories = {
    all: `${config.api_url}/api/categories/products`,
  };
  public apiProductsTags = {
    all: `${config.api_url}/api/tags/products`,
  };
  public apiImages = {
    all: `${config.api_url}/api/images`,
    register: `${config.api_url}/api/images/reg`,
    update: `${config.api_url}/api/images/update`,
    allPublic: `${config.api_url}/api/public/images`,
  };
  public apiReviews = {
    all: `${config.api_url}/api/reviews`,
    allPublic: `${config.api_url}/api/public/reviews`,
  };
  public apiTransactions = {
    all: `${config.api_url}/api/transactions`,
  };
  public apiProducts = {
    all: `${config.api_url}/api/products`,
    allUpdate: `${config.api_url}/api/products/update`,
    allPublic: `${config.api_url}/api/public/products`,
    allFilterPublic: `${config.api_url}/api/public/products/filter`,
  };
  public apiOrders = {
    all: `${config.api_url}/api/orders`,
  };
  public apiCarts = {
    all: `${config.api_url}/api/carts`,
  };
  public apiCartsProducts = {
    all: `${config.api_url}/api/carts/products`,
  };
  public apiRoles = {
    allPublic: `${config.api_url}/api/public/roles`,
    all: `${config.api_url}/api/roles`,
  };
  public apiInfoPages = {
    allPublic: `${config.api_url}/api/public/info/page`,
    all: `${config.api_url}/api/info/page`,
  };
  public apiGlobalConfig = {
    allPublic: `${config.api_url}/api/public/global/config`,
    all: `${config.api_url}/api/global/config`,
  };
  public apiInfoImages = {
    all: `${config.api_url}/api/info/images`,
    register: `${config.api_url}/api/info/images/reg`,
    update: `${config.api_url}/api/info/images/update`,
    allPublic: `${config.api_url}/api/public/info/images`,
  };

  // Error handling
  public handleError(error) {
    const errorMessage = config.environment === 'prod' ? `Code: ${error.status}\nMessage: ${error.message}` : `${error.error.message}`;
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
