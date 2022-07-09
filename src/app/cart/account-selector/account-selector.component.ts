import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-account-selector',
    templateUrl: './account-selector.component.html',
    styleUrls: ['./account-selector.component.scss'],
})
export class AccountSelectorComponent {
    public loggedIn = false;

    constructor(private router: Router) {}

    public nextStep(): void {
        this.router.navigate(['billing']);
    }

    public prevStep(): void {
        this.router.navigate(['cart']);
    }

    public handle(event: boolean) {
        this.loggedIn = event;
    }
}
