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
  public readOnly!: boolean;
  @Input()
  public item!: MenuItem;
  @Input()
  public quantity?: number = undefined; // this must be sent on readOnly mode
  @Output()
  public addItem = new EventEmitter<MenuOrder>();
  @Output()
  public deleteItem = new EventEmitter<string>();

  public numbers: number[] = [];
  public orderQuantity = 1;

  constructor() {}

  ngOnInit(): void {
    this.numbers = Array(this.item.available)
      .fill(0)
      .map((x, i) => i)
      .map((x, i) => i)
      .filter((x) => x > 0);
    if (this.quantity) {
      this.orderQuantity = this.quantity;
    } else {
      this.orderQuantity = this.numbers[0];
    }
  }

  public onAdd(): void {
    this.addItem.emit(new MenuOrder({ item: this.item, quantity: this.orderQuantity }));
    if (!this.readOnly) {
      this.readOnly = true;
    }
  }

  public onDelete(): void {
    this.deleteItem.emit(this.item.id);
  }

  public onEdit(): void {
    this.readOnly = false;
  }
}
