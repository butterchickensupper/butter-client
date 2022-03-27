import { Component, Input, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
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
  readOnly: boolean = false;
  @Input()
  public quantity?: number = undefined; // this must be sent on readOnly mode

  public selected = false;
  public numbers: number[] = [];

  public get order(): MenuOrder | undefined {
    if (!this.selected) return undefined;
    if (!this.quantity) return undefined;
    return new MenuOrder({ item: this.item, quantity: this.quantity });
  }

  constructor() {}

  ngOnInit(): void {
    if (this.readOnly && this.quantity === undefined) {
      throw new Error('quantity should be defined');
    }

    this.numbers = Array(this.item.available)
      .fill(0)
      .map((x, i) => i)
      .filter((x) => x > 0);
  }

  public reset(): void {
    this.quantity = undefined;
    this.selected = false;
  }

  public selectionChanged(event: MatSelectChange): void {
    if (event.value > 0) {
      this.selected = true;
    }
  }
}
