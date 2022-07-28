import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { SETTINGS as AUTH_SETTINGS, USE_EMULATOR as USE_AUTH_EMULATOR } from '@angular/fire/compat/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { CookieService } from 'ngx-cookie-service';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BillingInfoComponent } from './cart/billing-info/billing-info.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutCompleteComponent } from './cart/checkout/checkout-complete.component';
import { CheckoutComponent } from './cart/checkout/checkout.component';
import { PaymentInfoComponent } from './cart/payment-info/payment-info.component';
import { AboutComponent } from './core/about/about.component';
import { ErrorDialogComponent } from './core/dialog/error-dialog';
import { LoginComponent } from './core/login/login.component';
import { TelInputComponent } from './core/login/tel-input/tel-input.component';
import { MaterialModule } from './core/material/material.module';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { ProfileComponent } from './core/profile/profile.component';
import { SidenavComponent } from './core/sidenav/sidenav.component';
import { ToolbarComponent } from './core/toolbar/toolbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorInterceptor } from './http/interceptors/error-interceptor';
import { JwtInterceptor } from './http/interceptors/jwt-interceptor';
import { MenuItemViewerComponent } from './menu/menu-item-viewer/menu-item-viewer.component';
import { MenuComponent } from './menu/menu.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { OrderDetailComponent } from './order-search/order-detail/order-detail.component';
import { OrderSearchComponent } from './order-search/order-search.component';
import { AuthService } from './services/auth/auth.service';
import { AutofocusDirective } from './utils/auto-focus.directive';

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
        DashboardComponent,
        LoginComponent,
        TelInputComponent,
        AutofocusDirective,
        ErrorDialogComponent,
        CheckoutComponent,
        CheckoutCompleteComponent,
        OrderSearchComponent,
        OrderDetailComponent,
        BillingInfoComponent,
        PaymentInfoComponent,
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
        provideFirebaseApp(() => initializeApp(environment.firebase, { automaticDataCollectionEnabled: false })),
        provideAuth(() => getAuth()),
    ],
    bootstrap: [AppComponent],
    providers: [
        CookieService,
        { provide: USE_AUTH_EMULATOR, useValue: !environment.production ? ['http://localhost:9099'] : undefined },
        {
            provide: AUTH_SETTINGS,
            useValue: { appVerificationDisabledForTesting: true },
        },
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true, deps: [AuthService] },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ],
})
export class AppModule {}
