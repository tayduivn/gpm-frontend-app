import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {HandleRequestService} from './handle-request.service';
import {ModelTag} from '../../models/model-tag';

@Injectable({
  providedIn: 'root'
})

export class TagApiService {

  constructor(
    private http: HttpClient,
    private request: HandleRequestService
  ) {
  }

  getTags(): Observable<ModelTag> {
    return this.http.get<ModelTag>(`${this.request.apiTags.allPublic}`)
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

  getTag(id): Observable<ModelTag> {
    return this.http.get<ModelTag>(`${this.request.apiTags.allPublic}?id=${id}`)
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

  createTag(model): Observable<ModelTag> {
    return this.http.post<ModelTag>(this.request.apiTags.all, model, this.request.httpJSONOptions)
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

  updateTag(model): Observable<ModelTag> {
    return this.http.put<ModelTag>(this.request.apiTags.all, model, this.request.httpJSONOptions)
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

  deleteTag(id) {
    this.request.httpJSONOptions.body = {id};
    return this.http.delete<ModelTag>(this.request.apiTags.all, this.request.httpJSONOptions)
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

}
