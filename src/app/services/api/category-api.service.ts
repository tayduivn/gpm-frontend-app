import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {HandleRequestService} from './handle-request.service';
import {ModelCategory} from '../../models/model-category';

@Injectable({
  providedIn: 'root'
})

export class CategoryApiService {

  constructor(
    private http: HttpClient,
    private request: HandleRequestService
  ) {
  }

  getCategories(): Observable<ModelCategory> {
    return this.http.get<ModelCategory>(`${this.request.apiCategories.allPublic}`)
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

  getCategory(id): Observable<ModelCategory> {
    return this.http.get<ModelCategory>(`${this.request.apiCategories.allPublic}?id=${id}`)
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

  createCategory(model): Observable<ModelCategory> {
    return this.http.post<ModelCategory>(this.request.apiCategories.all, model, this.request.httpJSONOptions())
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

  updateCategory(model): Observable<ModelCategory> {
    return this.http.put<ModelCategory>(this.request.apiCategories.all, model, this.request.httpJSONOptions())
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

  deleteCategory(id) {
    this.request.httpJSONOptions().body = {id};
    return this.http.delete<ModelCategory>(this.request.apiCategories.all, this.request.httpJSONOptions())
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

}
