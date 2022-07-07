import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-account-selector',
    templateUrl: './account-selector.component.html',
    styleUrls: ['./account-selector.component.scss'],
})
export class AccountSelectorComponent implements OnInit {
    public form = this.fb.group({
        phoneNumber: ['', [Validators.required, Validators.pattern('[- +()0-9]+')]],
    });

    constructor(public fb: UntypedFormBuilder, private router: Router) {}

    ngOnInit(): void {}

    public nextStep(): void {
        this.router.navigate(['order-info']);
    }
    public prevStep(): void {
        this.router.navigate(['cart']);
    }
}
