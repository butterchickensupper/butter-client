import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor() {}

    public get userId(): string | undefined {
        return '';
    }

    public get idToken$(): Observable<string | undefined> {
        return of('');
    }
}
