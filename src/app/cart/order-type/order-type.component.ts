import { Component } from '@angular/core';
import { OrderType } from 'src/app/models/order-type.enum';
import { CartExpansionService } from 'src/app/services/cart/cart-expansion.service';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
    selector: 'app-order-type',
    templateUrl: './order-type.component.html',
    styleUrls: ['./order-type.component.scss'],
})
export class OrderTypeComponent {
    public existing: OrderType | undefined;
    public step$;
    public stepId = 2;

    constructor(private cartExpansionService: CartExpansionService, private cartService: CartService) {
        this.existing = this.cartService.orderType;
        this.step$ = this.cartExpansionService.step$;
    }

    public selectDelivery() {
        this.set(OrderType.Delivery);
    }

    public selectPickup() {
        this.set(OrderType.Pickup);
    }

    public opened(): void {
        this.cartExpansionService.setStep(this.stepId);
    }

    private set(type: OrderType): void {
        this.existing = type;
        this.cartService.setOrderType(type);
        this.cartExpansionService.nextStep();
    }
}
