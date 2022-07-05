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
        this._loading.next(true);
    }

    public hide() {
        this._loading.next(false);
    }
}
