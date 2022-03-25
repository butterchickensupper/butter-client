import { Component, Input, OnInit } from '@angular/core';
import { Order } from '../models/order';

@Component({
  selector: 'app-order-viewer',
  templateUrl: './order-viewer.component.html',
  styleUrls: ['./order-viewer.component.scss']
})
export class OrderViewerComponent implements OnInit {
  @Input()
  public order?: Order;

  constructor() {}

  ngOnInit(): void {
    console.log('init');
  }

  public submitOrder(): void {}
}
