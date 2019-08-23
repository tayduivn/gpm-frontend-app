import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {HandleRequestService} from './handle-request.service';
import {ModelProduct} from '../../models/model-product';

@Injectable({
  providedIn: 'root'
})

export class ProductApiService {

  constructor(
    private http: HttpClient,
    private request: HandleRequestService
  ) {
  }

  /**
   * Queries
   * ?productName=${name}&limit=12&page=${page}
   * ?order=RAND&limit=3
   * ?new=true&limit=15
   * ?favorite=true&limit=15
   * ?id=${id}&category=true&limit=15&order=RAND
   */
  getProducts(query = ''): Observable<ModelProduct> {
    return this.http.get<ModelProduct>(`${this.request.apiProducts.allPublic}${query}`, this.request.httpJSONOptions)
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

  /**
   * Queries
   * ?categoryName=${name}&tagName=${name}&orderBy={12}&Quantity{1-100}&rangeDate{04-29-2019|03-28-2019}&order=RAND&limit=12&page=${1}
   */
  getFilterProducts(query = ''): Observable<ModelProduct> {
    return this.http.get<ModelProduct>(`${this.request.apiProducts.allFilterPublic}${query}`, this.request.httpJSONOptions)
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

  getProduct(id): Observable<ModelProduct> {
    return this.http.get<ModelProduct>(`${this.request.apiProducts.allPublic}?id=${id}`, this.request.httpJSONOptions)
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

  createProduct(model): Observable<ModelProduct> {
    return this.http.post<ModelProduct>(this.request.apiProducts.all, model, this.request.httpFormOptions)
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

  updateProduct(model): Observable<ModelProduct> {
    return this.http.post<ModelProduct>(this.request.apiProducts.allUpdate, model, this.request.httpFormOptions)
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

  deleteProduct(id) {
    this.request.httpJSONOptions.body = {id};
    return this.http.delete<ModelProduct>(this.request.apiProducts.all, this.request.httpJSONOptions)
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

}
