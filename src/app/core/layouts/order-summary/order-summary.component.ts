import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css'],
})
export class OrderSummaryComponent implements OnInit, OnDestroy {
  cartItems: any;
  cartTotal: any;
  deliveryCharge: number;
  total: number;
  subscription: Subscription;

  constructor(private cartService: CartService) {
    this.subscription = this.cartService.subTotal$.subscribe((value) => {
      this.cartTotal = value;
    });
  }

  ngOnInit(): void {
    this.cartItems = JSON.parse(localStorage.getItem('cart-item'))
      ? JSON.parse(localStorage.getItem('cart-item'))
      : [];

    this.cartTotal = JSON.parse(localStorage.getItem('cart-sub-total'))
      ? JSON.parse(localStorage.getItem('cart-sub-total'))
      : 0;

    this.deliveryCharge = this.cartTotal < 99 ? 40 : 0;
    this.total = this.cartTotal + this.deliveryCharge;
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
