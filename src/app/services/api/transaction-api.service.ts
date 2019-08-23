import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {HandleRequestService} from './handle-request.service';
import {ModelTransaction} from '../../models/model-transaction';

@Injectable({
  providedIn: 'root'
})

export class TransactionApiService {

  constructor(
    private http: HttpClient,
    private request: HandleRequestService
  ) {
  }

  getTransactions(query = ''): Observable<ModelTransaction> {
    return this.http.get<ModelTransaction>(`${this.request.apiTransactions.all}${query}`, this.request.httpJSONOptions)
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

  getTransaction(id): Observable<ModelTransaction> {
    return this.http.get<ModelTransaction>(`${this.request.apiTransactions.all}?id=${id}`, this.request.httpJSONOptions)
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

  createTransaction(model): Observable<ModelTransaction> {
    return this.http.post<ModelTransaction>(this.request.apiTransactions.all, model, this.request.httpJSONOptions)
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

  updateTransaction(model): Observable<ModelTransaction> {
    return this.http.put<ModelTransaction>(this.request.apiTransactions.all, model, this.request.httpJSONOptions)
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

  deleteTransaction(id) {
    this.request.httpJSONOptions.body = {id};
    return this.http.delete<ModelTransaction>(this.request.apiTransactions.all, this.request.httpJSONOptions)
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

}
