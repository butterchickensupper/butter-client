import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Menu } from '../models/menu';
import { MenuOrder } from '../models/order';
import { LoadingService } from '../services/loading/loading.service';
import { MenuService } from '../services/menu/menu.service';
import { OrderService } from '../services/order/order.service';
import { MenuItemViewerComponent } from './menu-item-viewer/menu-item-viewer.component';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
    @ViewChildren('viewer') items?: QueryList<MenuItemViewerComponent>;
    public adminMode = false;
    public menu?: Menu;

    constructor(
        private orderService: OrderService,
        private menuService: MenuService,
        private snackBar: MatSnackBar,
        private loadingService: LoadingService
    ) {}

    ngOnInit(): void {
        setTimeout(() => this.loadingService.show(), 0);
        this.menuService.getMenu('default').subscribe((res) => {
            this.menu = res;
            setTimeout(() => this.loadingService.hide(), 0);
        });
    }

    public onAdd(order: MenuOrder): void {
        this.orderService.addMenuOrder(order, true).subscribe(() => {
            this.snackBar.open('Item Added!', 'Dismiss', { duration: 3 * 1000 });
        });
    }

    public onDelete(id: string): void {
        this.orderService.removeMenuOrder(id).subscribe(() => {
            this.snackBar.open('Item Added!', 'Dismiss', { duration: 3 * 1000 });
        });
    }
}
