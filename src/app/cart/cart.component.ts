import { Component, OnInit } from '@angular/core';

import { MenuOrder } from '../models/order';
import { CartService } from '../services/cart/cart.service';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
    public checkout = false;
    public orders: MenuOrder[] = [];

    constructor(private cartService: CartService) {}

    ngOnInit(): void {
        this.orders = this.cartService.menuOrders;
    }

    public goToAccount(): void {
        this.checkout = true;
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
