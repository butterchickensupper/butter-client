import { Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-account-selector',
    templateUrl: './account-selector.component.html',
    styleUrls: ['./account-selector.component.scss'],
})
export class AccountSelectorComponent {
    public form = this.fb.group({
        phoneNumber: ['', [Validators.required, Validators.pattern('[- +()0-9]+')]],
    });

    constructor(public fb: UntypedFormBuilder, private router: Router) {
        // TODO: ensure user is already loading if user logs in before
    }

    public nextStep(): void {
        this.router.navigate(['billing']);
    }

    public prevStep(): void {
        this.router.navigate(['cart']);
    }
}
