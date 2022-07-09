import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
import { BillingInfo } from 'src/app/models/billing-info';
import { AppState, MenuOrder } from 'src/app/models/order';
import { OrderType } from 'src/app/models/order-type.enum';

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

    public get order(): AppState {
        return this.state;
    }

    public get orderType(): OrderType | undefined {
        return this.state.orderType;
    }

    public get billingInfo(): BillingInfo | undefined {
        return this.state.billingInfo;
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

    public setOrderType(type: OrderType): void {
        this.state.orderType = type;
        this.persistState();
    }

    public setBillingInfo(info: BillingInfo): void {
        this.state.billingInfo = info;
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
