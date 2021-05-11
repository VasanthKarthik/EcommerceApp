import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/layouts/header/header.component';
import { FooterComponent } from './core/layouts/footer/footer.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { SignupComponent } from './modules/auth/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePageComponent } from './core/layouts/home-page/home-page.component';
import { ProductListComponent } from './core/layouts/product-list/product-list.component';
import { SideNavBarComponent } from './core/layouts/side-nav-bar/side-nav-bar.component';
import { ProductDetailComponent } from './core/layouts/product-detail/product-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { ShoppingCartComponent } from './core/layouts/shopping-cart/shopping-cart.component';
import { MiniCartComponent } from './core/layouts/mini-cart/mini-cart.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CheckoutComponent } from './core/layouts/checkout/checkout.component';
import { OrderSummaryComponent } from './core/layouts/order-summary/order-summary.component';
import { BillingInformationComponent } from './core/layouts/billing-information/billing-information.component';
import { CardInformationComponent } from './core/layouts/card-information/card-information.component';
import { SuccessMessageComponent } from './core/layouts/success-message/success-message.component';
import { SpacePipe } from './shared/pipes/space.pipe';
import { VegetableListComponent } from './core/layouts/vegetable-list/vegetable-list.component';
import { FruitListComponent } from './core/layouts/fruit-list/fruit-list.component';
import { FoodListComponent } from './core/layouts/food-list/food-list.component';
import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    HomePageComponent,
    ProductListComponent,
    SideNavBarComponent,
    ProductDetailComponent,
    ShoppingCartComponent,
    MiniCartComponent,
    CheckoutComponent,
    OrderSummaryComponent,
    BillingInformationComponent,
    CardInformationComponent,
    SuccessMessageComponent,
    VegetableListComponent,
    FruitListComponent,
    FoodListComponent,

    SpacePipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(), 
    TextMaskModule 
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
