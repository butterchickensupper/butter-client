import { Component, Input, OnInit } from '@angular/core';
import { Order } from '../models/order';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  @Input()
  public order?: Order;

  constructor() {}

  ngOnInit(): void {
    console.log('init');
  }

  public submitOrder(): void {}
  public clearOrder(): void {}
}
