import { Component, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
    public total: number = 0;

    constructor(public router: Router, private cartService: CartService) {
        this.cartService.totalItems$.subscribe((res) => {
            this.total = res;
        });
        this.cartService.updateTotals();
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
