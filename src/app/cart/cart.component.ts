import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { MenuOrder } from '../models/order';
import { CartService } from '../services/cart/cart.service';
import { BillingInfoComponent } from './billing-info/billing-info.component';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
    public orderInfo!: BillingInfoComponent;
    public orders: MenuOrder[] = [];

    constructor(public fb: UntypedFormBuilder, private cartService: CartService, private router: Router) {}

    ngOnInit(): void {
        this.orders = this.cartService.menuOrders;
    }

    public goToAccount(): void {
        this.router.navigate(['/account']);
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
