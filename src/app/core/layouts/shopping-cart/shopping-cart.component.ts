import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../authentication/authentication.service';
import { CartService } from '../../services/cart.service';
import { NotificationService } from '../../services/notificaion.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  cartItemList: any;
  subTotal: number;
  discountPercentage: number;
  discountPrice: number = 0;
  shippingCharge: number = 0;
  PayableAmount: number = 0;
  isRemoveAll: boolean = false;
  subscription: Subscription;

  constructor(
    private route: Router,
    private authenticationService: AuthenticationService,
    private cartService: CartService,
    private notificationService: NotificationService
  ) {
    this.subscription = this.cartService.subTotal$.subscribe((value: any) => {
      this.subTotal = value;
    });
    this.subTotal = localStorage.getItem('cart-sub-total')
      ? JSON.parse(localStorage.getItem('cart-sub-total'))
      : 0;
  }

  ngOnInit(): void {
    this.cartItemList = JSON.parse(localStorage.getItem('cart-item'))
      ? JSON.parse(localStorage.getItem('cart-item'))
      : [];
    if (this.cartItemList.length != 0) {
      this.calculateCartTotal();
    }
  }

  decrement(index: number) {
    let item = this.cartItemList[index];
    if (item.quantity > 1) {
      item.quantity--;
    }
  }

  increment(index: number) {
    let item = this.cartItemList[index];
    item.quantity++;
  }

  goToProducts() {
    this.route.navigateByUrl('/categories/products');
  }

  updateCart() {
    localStorage.setItem('cart-item', JSON.stringify(this.cartItemList));
    this.calculateCartTotal();
  }

  calculateCartTotal() {
    let sumOfPercentage = 0;
    this.cartItemList.forEach((i) => {
      sumOfPercentage += i.product.discountPercentage;
    });
    this.discountPercentage = sumOfPercentage <= 35 ? sumOfPercentage : 35;
    this.discountPrice = (this.discountPercentage / 100) * this.subTotal;
    this.shippingCharge = this.subTotal > 0 && this.subTotal > 99 ? 0 : 40;
    this.PayableAmount =
      this.subTotal - this.discountPrice + this.shippingCharge;
  }

  removeCartItem(index: number) {
    this.cartItemList = this.cartService.removeCartItem(
      this.cartItemList,
      index
    );
    this.calculateCartTotal();
  }

  checkOut() {
    if (this.authenticationService.isLogin()) {
      this.route.navigateByUrl('/checkout');
    } else{
      this.notificationService.showWarning('You need to login for Checkout!','Warning')
    }
  }
}
