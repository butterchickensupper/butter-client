import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { MenuOrder, Order } from '../models/order';
import { PaymentInfo } from '../models/payment-info';
import { CartExpansionService } from '../services/cart/cart-expansion.service';
import { CartService } from '../services/cart/cart.service';
import { LoadingService } from '../services/loading/loading.service';
import { OrderService } from '../services/order/order.service';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
    public checkout = false;
    public orders: MenuOrder[] = [];
    public step$: Observable<number>;
    public stepId = 0;

    constructor(
        private cartService: CartService,
        public cartExpansionService: CartExpansionService,
        private orderService: OrderService,
        private loadingService: LoadingService
    ) {
        this.step$ = this.cartExpansionService.step$;
        this.orders = this.cartService.menuOrders;
    }

    public goToAccount(): void {
        this.checkout = true;
        this.cartExpansionService.nextStep();
    }

    public getTotal(): number | undefined {
        if (!this.orders) return undefined;
        let total = 0.0;
        this.orders.forEach((i) => {
            total += i.item.price * i.quantity;
        });
        return total;
    }

    public submit(event: PaymentInfo): void {
        console.log('paymentInfo', event);
        const state = this.cartService.order;
        if (!state.billingInfo) return;

        setTimeout(() => this.loadingService.show(), 0);
        var o = new Order({
            billingInfo: state.billingInfo,
            items: state.items,
        });
        this.orderService.submitOrder(o).subscribe({
            next: () => {
                this.cartService.clear();
                this.cartExpansionService.setStep(0);
                this.checkout = false;
                setTimeout(() => this.loadingService.hide(), 0);
            },
            error: (error) => {
                // TODO: inform user
                console.log(error);
                setTimeout(() => this.loadingService.hide(), 0);
            },
        });
    }

    public onEdit(order: MenuOrder): void {
        this.cartService.addOrder(order);
    }

    public onDelete(itemId: any): void {
        this.cartService.removeOrder(itemId);
    }
}
