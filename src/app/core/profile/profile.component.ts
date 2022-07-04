import { Component, ViewChild } from '@angular/core';

import { UserInfoComponent } from '../user-info/user-info.component';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
    @ViewChild('userInfo')
    public userInfo!: UserInfoComponent;

    constructor() {}

    public save(): void {}

    public cancel(): void {}
}
