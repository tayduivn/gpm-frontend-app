import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {HandleRequestService} from './handle-request.service';
import {ModelGlobalConfig} from '../../models/model-global-config';

@Injectable({
  providedIn: 'root'
})

export class GlobalConfigApiService {

  constructor(
    private http: HttpClient,
    private request: HandleRequestService
  ) {
  }

  getGlobalConfigs(query = ''): Observable<ModelGlobalConfig> {
    return this.http.get<ModelGlobalConfig>(`${this.request.apiGlobalConfig.allPublic}${query}`)
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

  getGlobalConfig(id): Observable<ModelGlobalConfig> {
    return this.http.get<ModelGlobalConfig>(`${this.request.apiGlobalConfig.allPublic}?id=${id}`)
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

  createGlobalConfig(model): Observable<ModelGlobalConfig> {
    return this.http.post<ModelGlobalConfig>(this.request.apiGlobalConfig.all, model, this.request.httpJSONOptions)
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

  updateGlobalConfig(model): Observable<ModelGlobalConfig> {
    return this.http.put<ModelGlobalConfig>(this.request.apiGlobalConfig.all, model, this.request.httpJSONOptions)
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

  deleteGlobalConfig(id) {
    this.request.httpJSONOptions.body = {id};
    return this.http.delete<ModelGlobalConfig>(this.request.apiGlobalConfig.all, this.request.httpJSONOptions)
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

}
