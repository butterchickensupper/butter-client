import { AfterViewInit, Component, ElementRef, EventEmitter, Optional, Output, ViewChild } from '@angular/core';
import {
    Auth,
    ConfirmationResult,
    RecaptchaVerifier,
    signInAnonymously,
    signInWithPhoneNumber,
    signOut,
} from '@angular/fire/auth';
import { FormControl, FormGroup } from '@angular/forms';
import { tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

import { MyTel } from './tel-input/tel-input.component';

export enum LoginTemplate {
    Landing = 'landing',
    Phone = 'phone',
    Login = 'login',
}

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements AfterViewInit {
    private recaptchaVerifier?: RecaptchaVerifier;
    public confirmationResult?: ConfirmationResult;

    public showPhoneNumber = false;
    public userId$;
    public template = LoginTemplate;
    public activeTemplate = LoginTemplate.Login;
    @ViewChild('recaptcha')
    public recaptchaWrapperRef?: ElementRef;

    public form: FormGroup = new FormGroup({
        tel: new FormControl(new MyTel('', '', '')),
    });

    @Output()
    public LoggedIn = new EventEmitter<boolean>();

    constructor(@Optional() private auth: Auth, private authService: AuthService) {
        this.userId$ = authService.userId$.pipe(
            tap((res) => {
                if (res) {
                    this.activeTemplate = LoginTemplate.Landing;
                    this.LoggedIn.emit(true);
                } else {
                    this.LoggedIn.emit(false);
                }
            })
        );
    }

    ngAfterViewInit() {
        if (this.recaptchaWrapperRef) {
            this.recaptchaVerifier = new RecaptchaVerifier(
                this.recaptchaWrapperRef.nativeElement,
                {
                    size: 'invisible',
                    callback: this.phoneLogin,
                },
                this.auth
            );
            this.recaptchaVerifier.render();
        }
    }

    login() {
        this.activeTemplate = LoginTemplate.Phone;
    }

    async loginAnonymously() {
        const response = await signInAnonymously(this.auth);
        if (response.user) {
            this.activeTemplate = LoginTemplate.Landing;
        } else {
            console.log('error with signInAnonymously');
        }
    }

    async phoneLogin() {
        if (!this.recaptchaVerifier) {
            // failed to init recaptcha
            return;
        }
        if (this.form.invalid) {
            // phone number is invalid
            return;
        }
        const number = this.form.get('tel')?.value;
        const phone = `+1${number.area}${number.exchange}${number.subscriber}`;
        //TODO: update with phone number
        this.confirmationResult = await signInWithPhoneNumber(this.auth, '+16665555555', this.recaptchaVerifier);

        // TODO: add to component
        const verificationCode = window.prompt('Please enter the verification ' + 'code that was sent to your mobile device.');
        if (!verificationCode) return;
        //TODO: update with verification code
        return this.confirmationResult.confirm('123456').then((res) => {
            if (res) {
                if (res) {
                    this.confirmationResult = undefined;
                    this.activeTemplate = LoginTemplate.Landing;
                } else console.log('info', res);
            }
        });
    }

    async logout() {
        signOut(this.auth).then(() => {
            this.reset();
        });
    }

    public reset(): void {
        this.confirmationResult = undefined;
        this.activeTemplate = LoginTemplate.Login;
    }
}
