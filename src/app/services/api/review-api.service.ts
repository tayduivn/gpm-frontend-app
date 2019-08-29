import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {HandleRequestService} from './handle-request.service';
import {ModelReview} from '../../models/model-review';

@Injectable({
  providedIn: 'root'
})

export class ReviewApiService {

  constructor(
    private http: HttpClient,
    private request: HandleRequestService
  ) {
  }

  getReviews(): Observable<ModelReview> {
    return this.http.get<ModelReview>(`${this.request.apiReviews.allPublic}`)
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

  getReview(id): Observable<ModelReview> {
    return this.http.get<ModelReview>(`${this.request.apiReviews.allPublic}?id=${id}`)
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

  createReview(model): Observable<ModelReview> {
    return this.http.post<ModelReview>(this.request.apiReviews.all, model, this.request.httpJSONOptions())
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

  updateReview(model): Observable<ModelReview> {
    return this.http.put<ModelReview>(this.request.apiReviews.all, model, this.request.httpJSONOptions())
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

  deleteReview(id) {
    this.request.httpJSONOptions().body = {id};
    return this.http.delete<ModelReview>(this.request.apiReviews.all, this.request.httpJSONOptions())
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

}
