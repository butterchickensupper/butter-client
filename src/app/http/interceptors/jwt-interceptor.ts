import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mergeMap, Observable } from 'rxjs';

import { AuthService } from '../../services/auth/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.authService.idToken$.pipe(
            mergeMap((res) => {
                console.log('idToken', res);
                if (res) {
                    request = request.clone({
                        setHeaders: { Authorization: `Bearer ${res}` },
                    });
                }
                return next.handle(request);
            })
        );
    }
}
