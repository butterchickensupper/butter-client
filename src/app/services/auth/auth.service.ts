import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { from, Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor() {}

    public get userId(): string | undefined {
        const user = firebase.auth().currentUser;
        return user ? user.uid : undefined;
    }

    public get idToken$(): Observable<string | undefined> {
        const user = firebase.auth().currentUser;
        if (!user) return of(undefined);
        return from(user.getIdToken());
    }
}
