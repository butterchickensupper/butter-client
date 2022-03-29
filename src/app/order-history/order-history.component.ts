import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/order';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent {
  public orders$: Observable<Order[]>;
  public step = 0;
  public panelOpenState = false;

  constructor(private orderServce: OrderService) {
    this.orders$ = this.orderServce.getOrders();
  }

  public setStep(index: number) {
    this.step = index;
  }

  public nextStep() {
    this.step++;
  }

  public prevStep() {
    this.step--;
  }
}
