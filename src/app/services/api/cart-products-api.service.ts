import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {HandleRequestService} from './handle-request.service';
import {ModelCartProduct} from '../../models/model-cart-product';

@Injectable({
  providedIn: 'root'
})

export class CartProductsApiService {

  constructor(
    private http: HttpClient,
    private request: HandleRequestService
  ) {
  }

  getCartProducts(): Observable<ModelCartProduct> {
    return this.http.get<ModelCartProduct>(`${this.request.apiCartsProducts.all}?showByUser=true`, this.request.httpJSONOptions())
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

  getCartProductId(id): Observable<ModelCartProduct> {
    return this.http.get<ModelCartProduct>(`${this.request.apiCartsProducts.all}?userId=${id}`, this.request.httpJSONOptions())
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

  createProduct(model): Observable<ModelCartProduct> {
    return this.http.post<ModelCartProduct>(this.request.apiCartsProducts.all, model, this.request.httpJSONOptions())
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

  updateProduct(model): Observable<ModelCartProduct> {
    return this.http.put<ModelCartProduct>(this.request.apiCartsProducts.all, model, this.request.httpJSONOptions())
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

  deleteProduct(id) {
    this.request.httpJSONOptions().body = {id};
    return this.http.delete<ModelCartProduct>(this.request.apiCartsProducts.all, this.request.httpJSONOptions())
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

}
