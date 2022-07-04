import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-billing-info',
    templateUrl: './billing-info.component.html',
    styleUrls: ['./billing-info.component.scss'],
})
export class BillingInfoComponent implements OnInit {
    public form = this.fb.group({
        name: ['', []],
        phone: ['', []],
    });

    constructor(public fb: UntypedFormBuilder) {}

    ngOnInit(): void {}
}
