import { AfterViewInit, Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { FirebaseUISignInFailure, FirebaseUISignInSuccessWithAuthResult } from 'firebaseui-angular';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements AfterViewInit {
    private appVerifier?: firebase.auth.RecaptchaVerifier;

    constructor(private afAuth: AngularFireAuth) {
        this.afAuth.authState.subscribe(this.firebaseAuthChangeListener);
    }

    public ngAfterViewInit(): void {
        this.appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    }

    public phoneLogin(phoneNumber: any): void {
        if (!this.appVerifier) {
            console.log('error');
            return;
        }
        this.afAuth
            .signInWithPhoneNumber(phoneNumber, this.appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message
                // then sign the user in with confirmationResult.confirm(code).
                this.appVerifier?.clear();
                console.log(confirmationResult);
                const verificationCode = window.prompt('Please enter the verification ' + 'code that was sent to your mobile device.');
                if (!verificationCode) return;
                return confirmationResult.confirm(verificationCode);
            })
            .catch((error) => {
                this.appVerifier?.clear();
                console.log('SMS not sent', error);
            });
    }

    private firebaseAuthChangeListener(response: firebase.User | null) {
        // if needed, do a redirect in here
        if (response) {
            console.log('Logged in :)');
        } else {
            console.log('Logged out :(');
        }
    }

    public successCallback(signInSuccessData: FirebaseUISignInSuccessWithAuthResult) {
        console.log('signInSuccessData', signInSuccessData);
        console.log(signInSuccessData.authResult.user?.uid);
    }

    public errorCallback(errorData: FirebaseUISignInFailure) {
        console.log('errorData', errorData);
    }

    public uiShownCallback() {
        console.log('uiShownCallback');
    }
}
