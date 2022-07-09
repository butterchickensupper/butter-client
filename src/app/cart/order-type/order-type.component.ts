import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrderType } from 'src/app/models/order-type.enum';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
    selector: 'app-order-type',
    templateUrl: './order-type.component.html',
    styleUrls: ['./order-type.component.scss'],
})
export class OrderTypeComponent {
    public existing: OrderType | undefined;

    constructor(private router: Router, private cartService: CartService) {
        this.existing = this.cartService.orderType;
    }

    public selectDelivery() {
        this.set(OrderType.Delivery);
    }

    public selectPickup() {
        this.set(OrderType.Pickup);
    }

    private set(type: OrderType): void {
        this.cartService.setOrderType(type);
        this.router.navigate(['billing']);
    }
}
