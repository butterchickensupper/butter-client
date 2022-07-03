import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  constructor(private http: HttpClient) {}

  public deleteImage(id: string): Observable<Object> {
    return this.http.delete('/api/image/' + id);
  }

  public uploadImage(file: File): Observable<HttpEvent<Object>> {
    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      return this.http.post('/api/image-upload', formData, {
        reportProgress: true,
        observe: 'events'
      });
    }
    return of();
  }
}
