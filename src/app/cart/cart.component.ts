import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { MenuOrder } from '../models/order';
import { CartExpansionService } from '../services/cart/cart-expansion.service';
import { CartService } from '../services/cart/cart.service';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
    public checkout = false;
    public orders: MenuOrder[] = [];
    public step$: Observable<number>;

    constructor(private cartService: CartService, public cartExpansionService: CartExpansionService) {
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

    public onEdit(order: MenuOrder): void {
        this.cartService.addOrder(order);
    }

    public onDelete(itemId: any): void {
        this.cartService.removeOrder(itemId);
    }
}
