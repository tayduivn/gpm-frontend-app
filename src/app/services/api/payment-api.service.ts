import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {HandleRequestService} from './handle-request.service';
import {ModelPayment} from '../../models/model-payment';

@Injectable({
  providedIn: 'root'
})

export class PaymentApiService {

  constructor(
    private http: HttpClient,
    private request: HandleRequestService
  ) {
  }

  getPayments(): Observable<ModelPayment> {
    return this.http.get<ModelPayment>(`${this.request.apiPayments.all}`, this.request.httpJSONOptions())
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

  getPayment(query): Observable<ModelPayment> {
    return this.http.get<ModelPayment>(`${this.request.apiPayments.all}${query}`, this.request.httpJSONOptions())
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

  createPaymentPaypal(model): Observable<ModelPayment> {
    return this.http.post<ModelPayment>(this.request.apiPayments.paypal, model, this.request.httpJSONOptions())
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

  updatePayment(model): Observable<ModelPayment> {
    return this.http.put<ModelPayment>(this.request.apiPayments.all, model, this.request.httpJSONOptions())
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

  deletePayment(id) {
    this.request.httpJSONOptions().body = {id};
    return this.http.delete<ModelPayment>(this.request.apiPayments.all, this.request.httpJSONOptions())
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

}
