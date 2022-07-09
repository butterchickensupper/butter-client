import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    public showCodeInput = false;
    @ViewChild('recaptcha-container')
    public recaptchaWrapperRef?: ElementRef;

    constructor() {
        // this.afAuth.authState.subscribe(this.firebaseAuthChangeListener);
    }

    public phoneLogin(phoneNumber: any): void {
        // this.afAuth
        //     .signInWithPhoneNumber(phoneNumber, this.recaptchaVerifier)
        //     .then((confirmationResult) => {
        //         this.showCodeInput = true;
        //         console.log(confirmationResult);
        //         const verificationCode = window.prompt('Please enter the verification ' + 'code that was sent to your mobile device.');
        //         if (!verificationCode) return;
        //         return confirmationResult.confirm(verificationCode).then((res) => {
        //             if (res) {
        //                 if (res && this.recaptchaWrapperRef && this.recaptchaVerifier) {
        //                     this.recaptchaVerifier.clear();
        //                     this.recaptchaWrapperRef.nativeElement.innerHTML = `<div id="recaptcha-container"></div>`;
        //                     // Initialize new reCaptcha verifier
        //                     this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
        //                         size: 'invisible',
        //                         callback: this.phoneLogin,
        //                     });
        //                     this.showCodeInput = false;
        //                 }
        //             }
        //         });
        //     })
        //     .catch((error) => {
        //         this.recaptchaVerifier?.clear();
        //         console.log('SMS not sent', error);
        //     });
    }

    // private firebaseAuthChangeListener(response: firebase.User | null) {
    //     // if needed, do a redirect in here
    //     if (response) {
    //         console.log('Logged in :)');
    //     } else {
    //         console.log('Logged out :(');
    //     }
    // }

    public successCallback(signInSuccessData: any) {
        console.log('signInSuccessData', signInSuccessData);
        console.log(signInSuccessData.authResult.user?.uid);
    }

    public errorCallback(errorData: any) {
        console.log('errorData', errorData);
    }

    public uiShownCallback() {
        console.log('uiShownCallback');
    }
}
