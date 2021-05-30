import { HostListener, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './core/layouts/about-us/about-us.component';
import { BillingInformationComponent } from './core/layouts/billing-information/billing-information.component';
import { CardInformationComponent } from './core/layouts/card-information/card-information.component';
import { CheckoutComponent } from './core/layouts/checkout/checkout.component';
import { FoodListComponent } from './core/layouts/food-list/food-list.component';
import { FruitListComponent } from './core/layouts/fruit-list/fruit-list.component';
import { HomePageComponent } from './core/layouts/home-page/home-page.component';
import { MiniCartComponent } from './core/layouts/mini-cart/mini-cart.component';
import { OrderSummaryComponent } from './core/layouts/order-summary/order-summary.component';
import { ProductDetailComponent } from './core/layouts/product-detail/product-detail.component';
import { ProductListComponent } from './core/layouts/product-list/product-list.component';
import { ShoppingCartComponent } from './core/layouts/shopping-cart/shopping-cart.component';
import { SideNavBarComponent } from './core/layouts/side-nav-bar/side-nav-bar.component';
import { SuccessMessageComponent } from './core/layouts/success-message/success-message.component';
import { VegetableListComponent } from './core/layouts/vegetable-list/vegetable-list.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { SignupComponent } from './modules/auth/signup/signup.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'about', component: AboutUsComponent },
  {
    path: 'categories',
    component: SideNavBarComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'products' },
      {
        path: 'products',
        component: ProductListComponent,
      },
      { path: 'products/:productId', component: ProductDetailComponent },
      {
        path: 'fruits',
        component: FruitListComponent,
      },
      {
        path: 'vegetables',
        component: VegetableListComponent,
      },
      {
        path: 'food',
        component: FoodListComponent,
      },
      { path: '**', component: ProductListComponent },
    ],
  },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'mini-cart', component: MiniCartComponent },
  {
    path: 'checkout',
    component: CheckoutComponent,
    children: [
      { path: '', redirectTo: 'billing-information', pathMatch: 'full' },
      { path: 'billing-information', component: BillingInformationComponent },
      { path: 'card-information', component: CardInformationComponent },
      { path: 'success-message', component: SuccessMessageComponent },
    ],
  },
  { path: 'order-summary', component: OrderSummaryComponent },
  { path: '**', component: HomePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
