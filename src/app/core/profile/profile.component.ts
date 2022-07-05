import { Component, ViewChild } from '@angular/core';
import { FirebaseUISignInFailure, FirebaseUISignInSuccessWithAuthResult } from 'firebaseui-angular';

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

    public successCallback(signInSuccessData: FirebaseUISignInSuccessWithAuthResult) {
        console.log('signInSuccessData', signInSuccessData);
    }

    public errorCallback(errorData: FirebaseUISignInFailure) {
        console.log('errorData', errorData);
    }

    public uiShownCallback() {
        console.log('uiShownCallback');
    }
}
