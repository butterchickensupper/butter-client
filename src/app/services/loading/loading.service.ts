import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class LoadingService {
    private _loading = new BehaviorSubject<boolean>(false);
    public readonly loading$ = this._loading.asObservable();

    constructor() {}

    public show() {
        setTimeout(() => this._loading.next(true), 0);
    }

    public hide() {
        setTimeout(() => this._loading.next(false), 0);
    }
}
