import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { MenuItem } from '../../models/menu';
import { MenuOrder } from '../../models/order';

@Component({
  selector: 'app-menu-item-viewer',
  templateUrl: './menu-item-viewer.component.html',
  styleUrls: ['./menu-item-viewer.component.scss']
})
export class MenuItemViewerComponent implements OnInit {
  @Input()
  item!: MenuItem;
  @Input()
  public quantity?: number = undefined; // this must be sent on readOnly mode
  @Output()
  public order = new EventEmitter<MenuOrder>();
  @Output()
  public remove = new EventEmitter<string>();

  public numbers: number[] = [];
  public orderQuantity = 1;

  constructor() {}

  ngOnInit(): void {
    this.numbers = Array(this.item.available)
      .fill(0)
      .map((x, i) => i)
      .map((x, i) => i)
      .filter((x) => x > 0);
    this.orderQuantity = this.numbers[0];
  }

  public onOrder(): void {
    this.order.emit(new MenuOrder({ item: this.item, quantity: this.orderQuantity }));
  }

  public onRemove(): void {
    this.remove.emit(this.item.id);
  }

  public onEdit(): void {
    // set control to edit mode
  }
}
