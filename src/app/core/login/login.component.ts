import { AfterViewInit, Component, ElementRef, OnDestroy, Optional, ViewChild } from '@angular/core';
import {
    Auth,
    authState,
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

    public showCodeInput = false;
    public showPhoneNumber = false;
    public readonly user: Observable<User | null> = EMPTY;
    public showLoginButton = false;
    public showLogoutButton = false;
    public template = LoginTemplate;
    public activeTemplate = LoginTemplate.Login;
    @ViewChild('recaptcha')
    public recaptchaWrapperRef?: ElementRef;

    form: FormGroup = new FormGroup({
        tel: new FormControl(new MyTel('', '', '')),
    });

    constructor(@Optional() private auth: Auth) {
        if (auth) {
            this.user = authState(this.auth);
            this.userDisposable = authState(this.auth)
                .pipe(
                    traceUntilFirst('auth'),
                    map((u) => !!u)
                )
                .subscribe((isLoggedIn) => {
                    this.showLoginButton = !isLoggedIn;
                    this.showLogoutButton = isLoggedIn;
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
        console.log('number', number);
        const response = await signInWithPhoneNumber(this.auth, '6665555555', this.recaptchaVerifier);

        this.showCodeInput = true;
        console.log(response);
        const verificationCode = window.prompt('Please enter the verification ' + 'code that was sent to your mobile device.');
        if (!verificationCode) return;
        return response.confirm(verificationCode).then((res) => {
            if (res) {
                if (res) this.activeTemplate = LoginTemplate.Landing;
                if (res && this.recaptchaWrapperRef && this.recaptchaVerifier) {
                    this.recaptchaVerifier.clear();
                    this.recaptchaWrapperRef.nativeElement.innerHTML = `<div id="recaptcha-container"></div>`;
                    // Initialize new reCaptcha verifier
                    this.recaptchaVerifier = new RecaptchaVerifier(
                        this.recaptchaWrapperRef.nativeElement,
                        {
                            size: 'invisible',
                            callback: this.phoneLogin,
                            expiredCallback: () => {
                                // reset recaptcha
                                console.log('reset');
                            },
                        },
                        this.auth
                    );
                    this.recaptchaVerifier.render();
                    this.showCodeInput = false;
                }
            }
        });
    }

    async logout() {
        return await signOut(this.auth);
    }
}
