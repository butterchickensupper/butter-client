import { Injectable, OnDestroy, Optional } from '@angular/core';
import { Auth, authState, User } from '@angular/fire/auth';
import { traceUntilFirst } from '@angular/fire/performance';
import { EMPTY, from, map, mergeMap, Observable, of, Subscription } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService implements OnDestroy {
    private readonly userDisposable: Subscription | undefined;
    private readonly user: Observable<User | null> = EMPTY;

    constructor(@Optional() private auth: Auth) {
        if (auth) {
            this.user = authState(this.auth);
            this.userDisposable = authState(this.auth)
                .pipe(
                    traceUntilFirst('auth'),
                    map((u) => !!u)
                )
                .subscribe();
        }
    }

    public get userId$(): Observable<string | undefined> {
        return this.user.pipe(
            map((res) => {
                return res?.uid;
            })
        );
    }

    public get idToken$(): Observable<string | undefined> {
        return this.user.pipe(
            mergeMap((res) => {
                if (!res) return of();
                return from(res.getIdToken());
            })
        );
    }

    ngOnDestroy() {
        if (this.userDisposable) {
            this.userDisposable.unsubscribe();
        }
    }
}
