import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-order-type',
    templateUrl: './order-type.component.html',
    styleUrls: ['./order-type.component.scss'],
})
export class OrderTypeComponent {
    constructor(private router: Router) {}

    public selectDelivery() {
        // set order type
        this.router.navigate(['billing']);
    }

    public selectPickup() {
        // set order type
        this.router.navigate(['billing']);
    }
}
