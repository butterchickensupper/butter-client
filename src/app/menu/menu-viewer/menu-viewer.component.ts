import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from '../models/menu';
import { MenuOrder } from '../models/order';

@Component({
  selector: 'app-menu-viewer',
  templateUrl: './menu-viewer.component.html',
  styleUrls: ['./menu-viewer.component.scss']
})
export class MenuViewerComponent implements OnInit {
  @Input()
  item!: MenuItem;
  @Input()
  readOnly: boolean = false;

  public quantity?: number = undefined;
  public selected = false;

  public get order(): MenuOrder | undefined {
    if (!this.selected) return undefined;
    if (!this.quantity) return undefined;
    return new MenuOrder({ item: this.item, quantity: this.quantity });
  }

  constructor() {}

  ngOnInit(): void {
    console.log('init');
  }
}
