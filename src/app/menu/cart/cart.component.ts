import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Order } from '../../models/order';
import { MenuService } from '../menu.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public order$: Observable<Order>;
  public order!: Order;

  public form = this.fb.group({
    name: ['', [Validators.required]],
    address: ['', [Validators.required]]
  });

  constructor(public fb: FormBuilder, private menuService: MenuService) {
    this.order$ = this.menuService.getOrder();
  }

  ngOnInit(): void {
    this.order$.subscribe((a) => {
      this.order = a;
    });
  }

  public getTotal(): number | undefined {
    if (!this.order?.items) return undefined;
    let total = 0.0;
    this.order.items.forEach((i) => {
      total += i.item.price * i.quantity;
    });
    return total;
  }

  public submitOrder(): void {
    if (!this.order) {
      console.log('order is null');
      return;
    }

    this.menuService.submitOrder(this.order).subscribe((res) => {
      console.log(res);
    });

    // clear order from store
    console.log(this.order);
  }

  public cancel(): void {}
  public onOrder(): void {}
}
