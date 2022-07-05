import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule, USE_EMULATOR as USE_AUTH_EMULATOR } from '@angular/fire/compat/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { firebase, firebaseui, FirebaseUIModule } from 'firebaseui-angular';
import { CookieService } from 'ngx-cookie-service';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartComponent } from './cart/cart.component';
import { AboutComponent } from './core/about/about.component';
import { MaterialModule } from './core/material/material.module';
import { OrderInfoComponent } from './core/order-info/order-info.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { PaymentInfoComponent } from './core/payment-info/payment-info.component';
import { PhoneAccountComponent } from './core/phone-account/phone-account.component';
import { ProfileComponent } from './core/profile/profile.component';
import { SidenavComponent } from './core/sidenav/sidenav.component';
import { ToolbarComponent } from './core/toolbar/toolbar.component';
import { UserInfoComponent } from './core/user-info/user-info.component';
import { MenuItemViewerComponent } from './menu/menu-item-viewer/menu-item-viewer.component';
import { MenuComponent } from './menu/menu.component';
import { OrderDashboardComponent } from './order-dashboard/order-dashboard.component';
import { OrderHistoryComponent } from './order-history/order-history.component';

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
        UserInfoComponent,
        OrderInfoComponent,
        PaymentInfoComponent,
        PhoneAccountComponent,
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
    providers: [CookieService, { provide: USE_AUTH_EMULATOR, useValue: !environment.production ? ['http://localhost:9099'] : undefined }],
})
export class AppModule {}
