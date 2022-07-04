import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-user-info',
    templateUrl: './user-info.component.html',
    styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent {
    @ViewChild('address')
    public address!: ElementRef<HTMLInputElement>;

    public form = this.fb.group({
        name: ['', []],
        phone: ['', []],
    });

    public get name(): string {
        return this.form.get('name')?.value;
    }

    public get addressResult(): string {
        return this.form.get('address')?.value;
    }

    constructor(public fb: FormBuilder) {}
}
