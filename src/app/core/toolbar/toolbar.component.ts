import { Component, Output } from '@angular/core';

import { OrderService } from 'src/app/services/order/order.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
    public total: number = 0;

    constructor(public router: Router, private orderService: OrderService) {
        this.orderService.totalItems$.asObservable().subscribe((res) => {
            this.total = res;
        });
    }

    @Output()
    public menuOpen = false;

    public menuClick(): void {
        this.menuOpen = !this.menuOpen;
    }

    public login(): void {
        this.router.navigate(['/profile']);
    }

    public cart(): void {
        this.router.navigate(['/cart']);
    }
}
