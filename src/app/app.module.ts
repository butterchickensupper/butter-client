import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule, SETTINGS, USE_EMULATOR as USE_AUTH_EMULATOR } from '@angular/fire/compat/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { firebase, firebaseui, FirebaseUIModule } from 'firebaseui-angular';
import { CookieService } from 'ngx-cookie-service';

import { environment } from '../environments/environment';
import { AboutComponent } from './about/about.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountSelectorComponent } from './cart/account-selector/account-selector.component';
import { BillingInfoComponent } from './cart/billing-info/billing-info.component';
import { CartComponent } from './cart/cart.component';
import { PaymentInfoComponent } from './cart/payment-info/payment-info.component';
import { LoginComponent } from './core/login/login.component';
import { MaterialModule } from './core/material/material.module';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { ProfileComponent } from './core/profile/profile.component';
import { SidenavComponent } from './core/sidenav/sidenav.component';
import { ToolbarComponent } from './core/toolbar/toolbar.component';
import { MenuItemViewerComponent } from './menu/menu-item-viewer/menu-item-viewer.component';
import { MenuComponent } from './menu/menu.component';
import { OrderDashboardComponent } from './order-dashboard/order-dashboard.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { OrderTypeComponent } from './cart/order-type/order-type.component';

const firebaseUiAuthConfig: firebaseui.auth.Config = {
    signInFlow: 'popup',
    signInOptions: [firebase.auth.PhoneAuthProvider.PROVIDER_ID, firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID],
    tosUrl: 'http://www.bcs.com',
    privacyPolicyUrl: 'http://www.google.com',
    credentialHelper: firebaseui.auth.CredentialHelper.NONE,
};

@NgModule({
    declarations: [
        AppComponent,
        PageNotFoundComponent,
        SidenavComponent,
        ToolbarComponent,
        ProfileComponent,
        AboutComponent,
        CartComponent,
        MenuComponent,
        MenuItemViewerComponent,
        OrderHistoryComponent,
        OrderDashboardComponent,
        BillingInfoComponent,
        PaymentInfoComponent,
        AccountSelectorComponent,
        LoginComponent,
        OrderTypeComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
            // Register the ServiceWorker as soon as the application is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000',
        }),
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        AngularFireModule.initializeApp(environment.firebaseConfig, { automaticDataCollectionEnabled: true }),
        AngularFireAuthModule,
        FirebaseUIModule.forRoot(firebaseUiAuthConfig),
    ],
    bootstrap: [AppComponent],
    providers: [
        CookieService,
        { provide: USE_AUTH_EMULATOR, useValue: !environment.production ? ['http://localhost:9099'] : undefined },
        {
            provide: SETTINGS,
            useValue: { appVerificationDisabledForTesting: !environment.production },
        },
    ],
})
export class AppModule {}
