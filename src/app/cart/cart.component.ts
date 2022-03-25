import { Component, OnInit } from '@angular/core';
import { MenuAgent } from '../menu/menu.agent';
import { Order } from '../menu/models/order';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public order: Order = new Order();

  constructor(public menuAgent: MenuAgent) {}

  ngOnInit(): void {}

  public getTotal(): number | undefined {
    if (!this.order) return undefined;
    let total = 0.0;
    this.order.items.forEach((i) => {
      total += i.item.price * i.quantity;
    });
    return total;
  }

  public submitOrder(): void {
    if (!this.order) {
      console.log('items is null');
      return;
    }
    this.menuAgent.submitOrder(this.order).subscribe((res) => {
      console.log(res);
    });

    // submit the order
    console.log(this.order);
  }

  public cancel(): void {}
}
