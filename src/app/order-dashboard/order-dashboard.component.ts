import { Component, OnInit } from '@angular/core';

import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order-dashboard',
  templateUrl: './order-dashboard.component.html',
  styleUrls: ['./order-dashboard.component.scss']
})
export class OrderDashboardComponent implements OnInit {
  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    console.log('init');
  }
}
