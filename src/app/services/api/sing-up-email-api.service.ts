import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {HandleRequestService} from './handle-request.service';
import {ModelSingUpEmail} from '../../models/model-sing-up-email';

@Injectable({
  providedIn: 'root'
})

export class SingUpEmailApiService {

  constructor(
    private http: HttpClient,
    private request: HandleRequestService
  ) {
  }

  getEmails(): Observable<ModelSingUpEmail> {
    return this.http.get<ModelSingUpEmail>(`${this.request.apiEmails.all}`, this.request.httpJSONOptions)
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

  getEmail(id): Observable<ModelSingUpEmail> {
    return this.http.get<ModelSingUpEmail>(`${this.request.apiEmails.all}?id=${id}`, this.request.httpJSONOptions)
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

  createEmail(model): Observable<ModelSingUpEmail> {
    return this.http.post<ModelSingUpEmail>(this.request.apiEmails.allPublic, model, this.request.httpJSONOptions)
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

}
