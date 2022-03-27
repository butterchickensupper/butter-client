import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MenuOrder, Order } from '../../models/order';
import { MenuService } from '../menu.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public orders$: Observable<MenuOrder[]>;
  public orders: MenuOrder[] = [];

  public form = this.fb.group({
    name: ['', [Validators.required]],
    address: ['', [Validators.required]]
  });

  constructor(public fb: FormBuilder, private menuService: MenuService) {
    this.orders$ = this.menuService.getOrders();
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

    var o = new Order({ name: this.form.get('name')?.value, address: this.form.get('address')?.value, items: this.orders });
    this.menuService.submitOrder(o).subscribe((res) => {
      console.log(res);
    });

    // clear order from store
    console.log(o);
    this.menuService.clearOrders();
  }

  public cancel(): void {
    // clear order from the store/server
  }

  public onOrder(): void {
    // submit order to the service
  }
}
