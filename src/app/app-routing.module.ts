import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CartComponent } from './cart/cart.component';
import { AboutComponent } from './core/about/about.component';
import { OrderInfoComponent } from './core/order-info/order-info.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { PhoneAccountComponent } from './core/phone-account/phone-account.component';
import { ProfileComponent } from './core/profile/profile.component';
import { MenuComponent } from './menu/menu.component';
import { OrderDashboardComponent } from './order-dashboard/order-dashboard.component';
import { OrderHistoryComponent } from './order-history/order-history.component';

const routes: Routes = [
    { path: 'about', component: AboutComponent },
    { path: 'cart', component: CartComponent },
    { path: 'phone', component: PhoneAccountComponent },
    { path: 'order-info', component: OrderInfoComponent },
    { path: 'menu', component: MenuComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'order-history', component: OrderHistoryComponent },
    { path: 'order-dashboard', component: OrderDashboardComponent },
    { path: '', redirectTo: '/menu', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
