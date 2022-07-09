import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
import { MenuOrder } from 'src/app/models/order';
import { AppState } from 'src/app/store/models/app-state.model';

@Injectable({
    providedIn: 'root',
})
export class CartService {
    private state!: AppState;

    public totalItems$ = new BehaviorSubject<number>(0);
    public total$ = new BehaviorSubject<number>(0);

    public get menuOrders(): MenuOrder[] {
        return this.state?.items ?? [];
    }

    constructor(private cookieService: CookieService) {
        var state = this.cookieService.get('state');
        if (state) {
            this.state = JSON.parse(state) as AppState;
        }
        if (!this.state) {
            this.state = { items: [] };
        }
    }

    public addOrder(order: MenuOrder, fromMenu = false): void {
        const i = this.state.items.findIndex((x) => x.id === order.id);
        if (i !== -1) {
            if (fromMenu) this.state.items[i].quantity += order.quantity;
            else this.state.items[i].quantity = order.quantity;
        } else {
            this.state.items.push(order);
        }
        this.updateTotals();
        this.persistState();
    }

    public removeOrder(orderId: any): boolean {
        const i = this.state.items.findIndex((x) => x.id === orderId);
        if (i === -1) return false;
        this.state.items.splice(i, 1);
        this.updateTotals();
        return true;
    }

    public clear(): void {
        this.state = { items: [] };
        this.persistState();
        this.updateTotals();
    }

    private persistState(): void {
        this.cookieService.set('state', JSON.stringify(this.state));
    }

    private updateTotals(): void {
        let t = 0;
        this.state.items.forEach((i) => {
            t += i.quantity;
        });
        this.totalItems$.next(t);
    }
}
