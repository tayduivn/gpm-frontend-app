import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {HandleRequestService} from './handle-request.service';
import {ModelImage} from '../../models/model-image';

@Injectable({
  providedIn: 'root'
})

export class ProductImageApiService {

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
  getImages(query): Observable<ModelImage> {
    return this.http.get<ModelImage>(`${this.request.apiImages.allPublic}${query}`)
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

  getImage(id): Observable<ModelImage> {
    return this.http.get<ModelImage>(`${this.request.apiImages.allPublic}?id=${id}`)
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

  createImage(model): Observable<ModelImage> {
    return this.http.post<ModelImage>(this.request.apiImages.register, model, this.request.httpFormOptions)
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

  updateImage(model): Observable<ModelImage> {
    return this.http.post<ModelImage>(this.request.apiImages.update, model, this.request.httpFormOptions)
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

  deleteImage(id) {
    this.request.httpJSONOptions.body = {id};
    return this.http.delete<ModelImage>(this.request.apiImages.all, this.request.httpJSONOptions)
      .pipe(
        retry(1),
        catchError(this.request.handleError)
      );
  }

}
