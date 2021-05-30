import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../authentication/authentication.service';
import { CartService } from '../../services/cart.service';
import { NotificationService } from '../../services/notificaion.service';

@Component({
  selector: 'app-mini-cart',
  templateUrl: './mini-cart.component.html',
  styleUrls: ['./mini-cart.component.css'],
})
export class MiniCartComponent implements OnInit, OnDestroy {
  cartItems: any;
  subTotal: number;
  subscription: Subscription;

  constructor(
    private route: Router,
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService,
    private cartService: CartService
  ) {
    this.subscription = this.cartService.subTotal$.subscribe((value: any) => {
      this.subTotal = JSON.parse(value);
    });
  }

  ngOnInit(): void {
    this.cartItems = JSON.parse(sessionStorage.getItem('cart-item'))
      ? JSON.parse(sessionStorage.getItem('cart-item'))
      : [];
    this.subTotal = JSON.parse(sessionStorage.getItem('cart-sub-total'))
      ? JSON.parse(sessionStorage.getItem('cart-sub-total'))
      : 0;
  }

  goToCart() {
    this.route.navigateByUrl('/shopping-cart');
  }

  checkOut() {
    if (this.authenticationService.isLogin()) {
      this.route.navigateByUrl('/checkout');
    } else {
      sessionStorage.setItem('event', 'login');
      this.authenticationService.loginSubject.next(false);
      sessionStorage.setItem('check-out',JSON.stringify(true));
      this.route.navigateByUrl('/login');
    }
  }

  removeCartItem(index: number) {
    this.cartItems = this.cartService.removeCartItem(this.cartItems, index);
  }

  removeAllCartItems() {
    this.cartItems = this.cartService.removeAll();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
