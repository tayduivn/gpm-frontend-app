import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {HandleRequestService} from './handle-request.service';
import {ModelProductTag} from '../../models/model-product-tag';

@Injectable({
  providedIn: 'root'
})

export class ProductTagApiService {

  constructor(
    private http: HttpClient,
    private request: HandleRequestService
  ) {
  }

  getProductTags(query = ''): Observable<ModelProductTag> {
    return this.http.get<ModelProductTag>(`${this.request.apiProductsTags.all}${query}`, this.request.httpJSONOptions)
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

  getProductTag(id): Observable<ModelProductTag> {
    return this.http.get<ModelProductTag>(`${this.request.apiProductsTags.all}?id=${id}`, this.request.httpJSONOptions)
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

  createProductTag(model): Observable<ModelProductTag> {
    console.log(model);
    return this.http.post<ModelProductTag>(this.request.apiProductsTags.all, model, this.request.httpJSONOptions)
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

  updateProductTag(model): Observable<ModelProductTag> {
    return this.http.put<ModelProductTag>(this.request.apiProductsTags.all, model, this.request.httpJSONOptions)
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

  deleteProductTag(model) {
    this.request.httpJSONOptions.body = model;
    return this.http.delete<ModelProductTag>(this.request.apiProductsTags.all, this.request.httpJSONOptions)
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

}
