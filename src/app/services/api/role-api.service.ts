import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, map, retry} from 'rxjs/operators';
import {HandleRequestService} from './handle-request.service';
import {ModelRoles} from '../../models/model-roles';

@Injectable({
  providedIn: 'root'
})

export class RoleApiService {

  constructor(
    private http: HttpClient,
    private request: HandleRequestService
  ) {
  }

  getRoles(): Observable<ModelRoles> {
    return this.http.get<ModelRoles>(`${this.request.apiRoles.allPublic}`)
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

  getRole(id): Observable<ModelRoles> {
    return this.http.get<ModelRoles>(`${this.request.apiRoles.allPublic}?id=${id}`)
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

  createRole(model): Observable<ModelRoles> {
    return this.http.post<ModelRoles>(this.request.apiRoles.all, model, this.request.httpJSONOptions())
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

  updateRole(model): Observable<ModelRoles> {
    return this.http.put<ModelRoles>(this.request.apiRoles.all, model, this.request.httpJSONOptions())
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

  deleteRole(id) {
    this.request.httpJSONOptions().body = {id};
    return this.http.delete<ModelRoles>(this.request.apiRoles.all, this.request.httpJSONOptions())
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

}
