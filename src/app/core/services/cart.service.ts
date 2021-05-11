import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProduct } from 'src/app/shared/models/product.model';

const CART_ITEM = 'cart-item';
const CART_LENGTH = 'cart-length';
const CART_SUB_TOTAL = 'cart-sub-total';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private lengthSource = new BehaviorSubject<number>(0);
  private subTotal = new BehaviorSubject<number>(0);

  cartLength$ = this.lengthSource.asObservable();
  subTotal$ = this.subTotal.asObservable();

  constructor() {}

  addToCart(product: IProduct, quantity: number) {
    let addProduct: any;
    let length: any;
    let isCartEmpty = localStorage.getItem(CART_ITEM) ? true : false;
    if (isCartEmpty) {
      addProduct = JSON.parse(localStorage.getItem(CART_ITEM));
      if (addProduct.find((i) => i.product.id === product.id)) {
        addProduct.find((i) => {
          if (i.product.id === product.id) {
            i.quantity = i.quantity + quantity;
          }
        });
      } else {
        addProduct.push({
          product: product,
          quantity: quantity,
        });
      }
    } else {
      addProduct = [
        {
          product: product,
          quantity: quantity,
        },
      ];
    }
    localStorage.setItem(CART_ITEM, JSON.stringify(addProduct));
    length = JSON.parse(localStorage.getItem(CART_ITEM)).length;
    localStorage.setItem(CART_LENGTH, JSON.stringify(length));
    this.lengthSource.next(length);
    this.calculateSubTotal(addProduct);
  }

  calculateSubTotal(items: any) {
    let sumOItems = 0;
    items.forEach((i) => {
      sumOItems += i.quantity * i.product.discountPrice;
    });
    localStorage.setItem(CART_SUB_TOTAL, JSON.stringify(sumOItems));
    this.subTotal.next(sumOItems);
  }

  removeCartItem(cartItems: any, index: number) {
    cartItems.splice(index, 1);
    localStorage.setItem(CART_ITEM, JSON.stringify(cartItems));
    let length = cartItems.length;
    localStorage.setItem(CART_LENGTH, length);
    this.lengthSource.next(length);
    this.calculateSubTotal(cartItems);
    return cartItems;
  }

  removeAll() {
    localStorage.removeItem(CART_ITEM);
    localStorage.removeItem(CART_LENGTH);
    localStorage.removeItem(CART_SUB_TOTAL);
    this.lengthSource.next(0);
    this.subTotal.next(0);

    return [];
  }
}
