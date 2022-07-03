import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AboutComponent } from './core/about/about.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CartComponent } from './cart/cart.component';
import { CookieService } from 'ngx-cookie-service';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './core/material/material.module';
import { MenuComponent } from './menu/menu.component';
import { MenuItemViewerComponent } from './menu/menu-item-viewer/menu-item-viewer.component';
import { NgModule } from '@angular/core';
import { OrderDashboardComponent } from './order-dashboard/order-dashboard.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { ProfileComponent } from './core/profile/profile.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { SidenavComponent } from './core/sidenav/sidenav.component';
import { ToolbarComponent } from './core/toolbar/toolbar.component';
import { UserInfoComponent } from './core/user-info/user-info.component';
import { environment } from '../environments/environment';

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
