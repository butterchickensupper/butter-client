import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuOrder, Order } from '../models/order';

import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { OrderService } from 'src/app/services/order.service';
import { UserInfoComponent } from '../core/user-info/user-info.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  @ViewChild('userInfo')
  public userInfo!: UserInfoComponent;

  public orders$: Observable<MenuOrder[]>;
  public orders: MenuOrder[] = [];

  constructor(public fb: FormBuilder, private orderService: OrderService) {
    this.orders$ = this.orderService.getMenuOrders();
  }

  ngOnInit(): void {
    this.orders$.subscribe((a) => {
      this.orders = a;
    });
  }

  public getTotal(): number | undefined {
    if (!this.orders) return undefined;
    let total = 0.0;
    this.orders.forEach((i) => {
      total += i.item.price * i.quantity;
    });
    return total;
  }

  public submitOrder(): void {
    if (!this.orders) {
      console.log('orders is null');
      return;
    }

    var o = new Order({
      name: this.userInfo.name,
      address: this.userInfo.addressResult,
      items: this.orders,
      date: new Date()
    });
    this.orderService.submitOrder(o).subscribe((res) => {
      console.log(res);
    });

    // clear order from store
    console.log(o);
    this.orderService.clearMenuOrders();
  }

  public cancel(): void {
    // clear order from the store/server
  }

  public onOrder(): void {
    // submit order to the service
  }

  public onEdit(order: MenuOrder): void {
    this.orderService.addMenuOrder(order);
  }

  public onDelete(itemId: any): void {
    this.orderService.removeMenuOrder(itemId);
  }
}
