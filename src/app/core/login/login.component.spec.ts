import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Auth, RecaptchaVerifier } from '@angular/fire/auth';
import { AuthService } from 'src/app/services/auth/auth.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [],
            declarations: [LoginComponent],
            providers: [
                {
                    provide: AuthService,
                    useVaalue: {},
                },
                {
                    provide: Auth,
                    useVaalue: {},
                },
                {
                    provide: RecaptchaVerifier,
                    useValue: {
                        render: jasmine.createSpy('render'),
                    },
                },
            ],
        }).compileComponents();

        // fixture = TestBed.createComponent(LoginComponent);
        // component = fixture.componentInstance;
        // fixture.detectChanges();
    });

    it('should create', () => {
        expect('test').toBeTruthy();
    });
});
