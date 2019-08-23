import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {HandleRequestService} from './handle-request.service';
import {ModelUser} from '../../models/model-user';
import {FirebaseAuthService} from '../firebase/firebase-auth.service';

@Injectable({
  providedIn: 'root'
})

export class UserApiService {

  constructor(
    private http: HttpClient,
    private request: HandleRequestService,
    private firebaseAuthService: FirebaseAuthService
  ) {
  }

  /**
   * Possible params
   * ?type={type}
   */
  getUsers(query = ''): Observable<ModelUser> {
    return this.http.get<ModelUser>(`${this.request.apiUsers.all}${query}`, this.request.httpJSONOptions)
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

  getUser(id): Observable<ModelUser> {
    return this.http.get<ModelUser>(`${this.request.apiUsers.all}?id=${id}`, this.request.httpJSONOptions)
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

  getUserEmail(email): Observable<ModelUser> {
    return this.http.get<ModelUser>(`${this.request.apiUsers.email}?email=${email}`, this.request.httpJSONOptions)
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

  /* Implement Firebase */
  loginUser(model): Observable<ModelUser> {
    return this.http.post<ModelUser>(this.request.apiUsers.login, model, this.request.httpJSONOptions)
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

  forgotUser(model): Observable<ModelUser> {
    return this.http.post<ModelUser>(this.request.apiUsers.forgot, model, this.request.httpJSONOptions)
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

  passwordUser(model): Observable<ModelUser> {
    return this.http.put<ModelUser>(this.request.apiUsers.password, model, this.request.httpJSONOptions)
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

  bankUser(model): Observable<ModelUser> {
    return this.http.put<ModelUser>(this.request.apiUsers.bank, model, this.request.httpJSONOptions)
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

  createUser(model): Observable<ModelUser> {
    return this.http.post<ModelUser>(this.request.apiUsers.register, model, this.request.httpJSONOptions)
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

  updateUser(model): Observable<ModelUser> {
    return this.http.put<ModelUser>(this.request.apiUsers.all, model, this.request.httpJSONOptions)
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

  updateUserPhoto(model): Observable<ModelUser>  {
    return this.http.post<ModelUser>(this.request.apiUsers.photo, model, this.request.httpFormOptions)
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

  deleteUser(id) {
    this.request.httpJSONOptions.body = {id};
    return this.http.delete<ModelUser>(this.request.apiUsers.all, this.request.httpJSONOptions)
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }
}
