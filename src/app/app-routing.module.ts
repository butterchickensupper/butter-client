import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CartComponent } from './cart/cart.component';
import { CheckoutCompleteComponent } from './cart/checkout/checkout-complete.component';
import { CheckoutComponent } from './cart/checkout/checkout.component';
import { AboutComponent } from './core/about/about.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { ProfileComponent } from './core/profile/profile.component';
import { MenuComponent } from './menu/menu.component';
import { OrderDashboardComponent } from './order-dashboard/order-dashboard.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { OrderSearchComponent } from './order-search/order-search.component';

const routes: Routes = [
    { path: 'about', component: AboutComponent },
    { path: 'cart', component: CartComponent },
    { path: 'checkout', component: CheckoutComponent },
    { path: 'status', component: CheckoutCompleteComponent },
    { path: 'menu', component: MenuComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'orders', component: OrderHistoryComponent },
    { path: 'search', component: OrderSearchComponent },
    { path: 'dashboard', component: OrderDashboardComponent },
    { path: '', redirectTo: '/menu', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
