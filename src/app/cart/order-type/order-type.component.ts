import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { OrderType } from 'src/app/models/order-type.enum';
import { setOrderType } from 'src/app/store/actions/order.action';
import { AppState } from 'src/app/store/models/app-state.model';
import { orderTypeSelector } from 'src/app/store/selectors/order.selectors';

@Component({
    selector: 'app-order-type',
    templateUrl: './order-type.component.html',
    styleUrls: ['./order-type.component.scss'],
})
export class OrderTypeComponent {
    public existing$: Observable<OrderType | undefined>;

    constructor(private router: Router, private store: Store<AppState>) {
        this.existing$ = this.store.select(orderTypeSelector);
    }

    public selectDelivery() {
        this.set(OrderType.Delivery);
    }

    public selectPickup() {
        this.set(OrderType.Pickup);
    }

    private set(type: OrderType): void {
        this.store.dispatch(setOrderType({ orderType: type }));
        this.router.navigate(['billing']);
    }
}
