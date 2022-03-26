import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MenuAgent } from '../menu/menu.agent';
import { Order } from '../models/order';
import { OrderState } from '../store/reducer/order.reducer';
import { selectOrder } from '../store/selector/order.selectors';

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

  constructor(public fb: FormBuilder, public menuAgent: MenuAgent, private store: Store<OrderState>) {
    this.order$ = this.store.pipe(select(selectOrder));
  }

  ngOnInit(): void {
    this.order$.subscribe((a) => {
      this.order = a;
    });
  }

  public getTotal(): number | undefined {
    if (!this.order.items) return undefined;
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

    this.menuAgent.submitOrder(this.order).subscribe((res) => {
      console.log(res);
    });

    // clear order from store
    console.log(this.order);
  }

  public cancel(): void {}
  public onOrder(): void {}
}
