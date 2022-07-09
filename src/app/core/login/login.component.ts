import { AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, Optional, Output, ViewChild } from '@angular/core';
import {
    Auth,
    authState,
    ConfirmationResult,
    RecaptchaVerifier,
    signInAnonymously,
    signInWithPhoneNumber,
    signOut,
    User,
} from '@angular/fire/auth';
import { traceUntilFirst } from '@angular/fire/performance';
import { FormControl, FormGroup } from '@angular/forms';
import { EMPTY, map, Observable, Subscription } from 'rxjs';

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
export class LoginComponent implements OnDestroy, AfterViewInit {
    private recaptchaVerifier?: RecaptchaVerifier;
    private readonly userDisposable: Subscription | undefined;
    public confirmationResult?: ConfirmationResult;

    public showPhoneNumber = false;
    public readonly user: Observable<User | null> = EMPTY;
    public loggedIn = false;
    public template = LoginTemplate;
    public activeTemplate = LoginTemplate.Login;
    @ViewChild('recaptcha')
    public recaptchaWrapperRef?: ElementRef;

    public form: FormGroup = new FormGroup({
        tel: new FormControl(new MyTel('', '', '')),
    });

    @Output() //TODO: rename this
    public LoggedIn = new EventEmitter<boolean>();

    constructor(@Optional() private auth: Auth) {
        if (auth) {
            this.user = authState(this.auth);
            this.userDisposable = authState(this.auth)
                .pipe(
                    traceUntilFirst('auth'),
                    map((u) => !!u)
                )
                .subscribe((isLoggedIn) => {
                    this.loggedIn = isLoggedIn;
                    this.LoggedIn.emit(this.loggedIn);
                    if (this.loggedIn) this.activeTemplate = LoginTemplate.Landing;
                });
        }
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

    ngOnDestroy() {
        if (this.userDisposable) {
            this.userDisposable.unsubscribe();
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
