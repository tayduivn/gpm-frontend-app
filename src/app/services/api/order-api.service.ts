import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {HandleRequestService} from './handle-request.service';
import {ModelOrder} from '../../models/model-order';

@Injectable({
  providedIn: 'root'
})

export class OrderApiService {

  constructor(
    private http: HttpClient,
    private request: HandleRequestService
  ) {
  }

  getOrders(query = ''): Observable<ModelOrder> {
    return this.http.get<ModelOrder>(`${this.request.apiOrders.all}${query}`, this.request.httpJSONOptions())
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

  getActiveOrder(active): Observable<ModelOrder> {
    return this.http.get<ModelOrder>(`${this.request.apiOrders.all}?active=${active}`, this.request.httpJSONOptions())
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

  getCartUserOrder(user_id, cart_id, stateOrder): Observable<ModelOrder> {
    return this.http.get<ModelOrder>(`${this.request.apiOrders.all}?userId=${user_id}&cartId=${cart_id}&status=${stateOrder}`, this.request.httpJSONOptions())
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

  getUserOrder(userId): Observable<ModelOrder> {
    return this.http.get<ModelOrder>(`${this.request.apiOrders.all}?userId=${userId}`)
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

  getOrder(id): Observable<ModelOrder> {
    return this.http.get<ModelOrder>(`${this.request.apiOrders.all}?id=${id}`)
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

  createOrder(model): Observable<ModelOrder> {
    return this.http.post<ModelOrder>(this.request.apiOrders.all, model, this.request.httpJSONOptions())
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

  updateOrder(model): Observable<ModelOrder> {
    return this.http.put<ModelOrder>(this.request.apiOrders.all, model, this.request.httpJSONOptions())
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

  deleteOrder(id) {
    this.request.httpJSONOptions().body = {id};
    return this.http.delete<ModelOrder>(this.request.apiOrders.all, this.request.httpJSONOptions())
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

}
