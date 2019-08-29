import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {HandleRequestService} from './handle-request.service';
import {ModelCart} from '../../models/model-cart';

@Injectable({
  providedIn: 'root'
})

export class CartApiService {

  constructor(
    private http: HttpClient,
    private request: HandleRequestService
  ) {
  }

  getCarts(): Observable<ModelCart> {
    return this.http.get<ModelCart>(`${this.request.apiCarts.all}?showByUser=true`, this.request.httpJSONOptions())
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

  getCartStatus(id): Observable<ModelCart> {
    return this.http.get<ModelCart>(`${this.request.apiCarts.all}?userId=${id}&status=current`, this.request.httpJSONOptions())
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

  getCartsByUser(id): Observable<ModelCart> {
    return this.http.get<ModelCart>(`${this.request.apiCarts.all}?userId=${id}`, this.request.httpJSONOptions())
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

  createCart(model): Observable<ModelCart> {
    return this.http.post<ModelCart>(this.request.apiCarts.all, model, this.request.httpJSONOptions())
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

  updateCart(model): Observable<ModelCart> {
    return this.http.put<ModelCart>(this.request.apiCarts.all, model, this.request.httpJSONOptions())
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

  deleteCart(id) {
    this.request.httpJSONOptions().body = {id};
    return this.http.delete<ModelCart>(this.request.apiCarts.all, this.request.httpJSONOptions())
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

}
