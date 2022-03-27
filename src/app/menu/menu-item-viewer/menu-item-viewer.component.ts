import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuItem } from '../../models/menu';
import { MenuOrder } from '../../models/order';

@Component({
  selector: 'app-menu-item-viewer',
  templateUrl: './menu-item-viewer.component.html',
  styleUrls: ['./menu-item-viewer.component.scss']
})
export class MenuItemViewerComponent {
  @Input()
  item!: MenuItem;
  @Input()
  public quantity?: number = undefined; // this must be sent on readOnly mode
  @Output()
  public order = new EventEmitter<MenuOrder>();
  @Output()
  public remove = new EventEmitter<string>();

  constructor() {}

  public onOrder(): void {
    this.order.emit(new MenuOrder({ item: this.item, quantity: 1 }));
  }
  public onRemove(): void {
    this.remove.emit('orderId');
  }
}
