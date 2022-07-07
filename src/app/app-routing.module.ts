import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { AccountSelectorComponent } from './cart/account-selector/account-selector.component';
import { CartComponent } from './cart/cart.component';
import { OrderInfoComponent } from './cart/order-info/order-info.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { ProfileComponent } from './core/profile/profile.component';
import { MenuComponent } from './menu/menu.component';
import { OrderDashboardComponent } from './order-dashboard/order-dashboard.component';
import { OrderHistoryComponent } from './order-history/order-history.component';

const routes: Routes = [
    { path: 'about', component: AboutComponent },
    { path: 'cart', component: CartComponent },
    { path: 'account', component: AccountSelectorComponent },
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
