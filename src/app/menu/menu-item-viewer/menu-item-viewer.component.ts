import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { MenuItem } from '../../models/menu';
import { MenuOrder } from '../../models/order';

@Component({
    selector: 'app-menu-item-viewer',
    templateUrl: './menu-item-viewer.component.html',
    styleUrls: ['./menu-item-viewer.component.scss'],
})
export class MenuItemViewerComponent implements OnInit {
    public editMode: boolean = false;
    /**
     * Should be true when the control is rendered on the menu
     */
    @Input()
    public onMenu!: boolean;
    @Input()
    public item!: MenuItem;
    @Input()
    public quantity: number = 1;
    @Input()
    public imageSize = 128;
    @Output()
    public addItem = new EventEmitter();
    @Output()
    public deleteItem = new EventEmitter<string>();

    public numbers: number[] = [];

    constructor() {}

    ngOnInit(): void {
        this.numbers = Array(this.item.available)
            .fill(0)
            .map((x, i) => i)
            .map((x, i) => i)
            .filter((x) => x > 0);
    }

    public onAdd(): void {
        this.addItem.emit(new MenuOrder({ item: this.item, quantity: this.quantity }));
        if (this.editMode) {
            this.editMode = false;
        }
    }

    public cancelEdit(): void {
        this.editMode = false;
    }

    public onDelete(): void {
        this.deleteItem.emit(this.item.id);
    }

    public onEdit(): void {
        this.editMode = true;
    }
}
