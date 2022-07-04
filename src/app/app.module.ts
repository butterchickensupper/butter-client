import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { CookieService } from 'ngx-cookie-service';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartComponent } from './cart/cart.component';
import { AboutComponent } from './core/about/about.component';
import { BillingInfoComponent } from './core/billing-info/billing-info.component';
import { MaterialModule } from './core/material/material.module';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { PaymentInfoComponent } from './core/payment-info/payment-info.component';
import { ProfileComponent } from './core/profile/profile.component';
import { SidenavComponent } from './core/sidenav/sidenav.component';
import { ToolbarComponent } from './core/toolbar/toolbar.component';
import { UserInfoComponent } from './core/user-info/user-info.component';
import { MenuItemViewerComponent } from './menu/menu-item-viewer/menu-item-viewer.component';
import { MenuComponent } from './menu/menu.component';
import { OrderDashboardComponent } from './order-dashboard/order-dashboard.component';
import { OrderHistoryComponent } from './order-history/order-history.component';

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
    ],
    bootstrap: [AppComponent],
    providers: [CookieService],
})
export class AppModule {}
