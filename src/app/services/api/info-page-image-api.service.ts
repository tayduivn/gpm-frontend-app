import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {HandleRequestService} from './handle-request.service';
import {ModelInfoImage} from '../../models/model-info-image';

@Injectable({
  providedIn: 'root'
})

export class InfoPageImageApiService {

  constructor(
    private http: HttpClient,
    private request: HandleRequestService
  ) {
  }

  createImage(model): Observable<ModelInfoImage> {
    return this.http.post<ModelInfoImage>(this.request.apiInfoImages.register, model, this.request.httpFormOptions())
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

  updateImage(model): Observable<ModelInfoImage> {
    return this.http.post<ModelInfoImage>(this.request.apiInfoImages.update, model, this.request.httpFormOptions())
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

  deleteImage(id) {
    this.request.httpJSONOptions().body = {id};
    return this.http.delete<ModelInfoImage>(this.request.apiInfoImages.all, this.request.httpJSONOptions())
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

}
