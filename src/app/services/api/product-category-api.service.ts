import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {HandleRequestService} from './handle-request.service';
import {ModelProductCategory} from '../../models/model-product-category';

@Injectable({
  providedIn: 'root'
})

export class ProductCategoryApiService {

  constructor(
    private http: HttpClient,
    private request: HandleRequestService
  ) {
  }

  /**
   * Possible params
   * ?productName=${name}&limit=12&page=${page}
   * ?order=RAND&limit=3
   * ?new=true&limit=15
   * ?favorite=true&limit=15
   * ?id=${id}&category=true&limit=15&order=RAND
   */
  getProductCategories(query = ''): Observable<ModelProductCategory> {
    return this.http.get<ModelProductCategory>(`${this.request.apiProductsCategories.all}${query}`, this.request.httpJSONOptions())
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

  getProductCategory(id): Observable<ModelProductCategory> {
    return this.http.get<ModelProductCategory>(`${this.request.apiProductsCategories.all}?id=${id}`, this.request.httpJSONOptions())
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

  createProductCategory(model): Observable<ModelProductCategory> {
    console.log(model);
    return this.http.post<ModelProductCategory>(this.request.apiProductsCategories.all, model, this.request.httpJSONOptions())
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

  updateProductCategory(model): Observable<ModelProductCategory> {
    return this.http.put<ModelProductCategory>(this.request.apiProductsCategories.all, model, this.request.httpJSONOptions())
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

  deleteProductCategory(model) {
    this.request.httpJSONOptions().body = model;
    return this.http.delete<ModelProductCategory>(this.request.apiProductsCategories.all, this.request.httpJSONOptions())
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

}
