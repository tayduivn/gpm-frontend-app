import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {HandleRequestService} from './handle-request.service';
import {ModelInfoPage} from '../../models/model-info-page';

@Injectable({
  providedIn: 'root'
})

export class InfoPageApiService {

  constructor(
    private http: HttpClient,
    private request: HandleRequestService
  ) {
  }

  getInfoPages(query = ''): Observable<ModelInfoPage> {
    return this.http.get<ModelInfoPage>(`${this.request.apiInfoPages.allPublic}${query}`)
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

  getInfoPage(id): Observable<ModelInfoPage> {
    return this.http.get<ModelInfoPage>(`${this.request.apiInfoPages.allPublic}?id=${id}`)
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

  createInfoPage(model): Observable<ModelInfoPage> {
    return this.http.post<ModelInfoPage>(this.request.apiInfoPages.all, model, this.request.httpJSONOptions())
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

  updateInfoPage(model): Observable<ModelInfoPage> {
    return this.http.put<ModelInfoPage>(this.request.apiInfoPages.all, model, this.request.httpJSONOptions())
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

  deleteInfoPage(id) {
    this.request.httpJSONOptions().body = {id};
    return this.http.delete<ModelInfoPage>(this.request.apiInfoPages.all, this.request.httpJSONOptions())
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

}
