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
    let isCartEmpty = sessionStorage.getItem(CART_ITEM) ? true : false;
    if (isCartEmpty) {
      addProduct = JSON.parse(sessionStorage.getItem(CART_ITEM));
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
    let productLength = 0;
    addProduct.forEach((i) => {
      productLength += i.quantity;
    });
    sessionStorage.setItem(CART_ITEM, JSON.stringify(addProduct));
    length = addProduct.length;
    sessionStorage.setItem(CART_LENGTH, JSON.stringify(productLength));
    this.lengthSource.next(productLength);
    this.calculateSubTotal(addProduct);
  }

  calculateSubTotal(items: any) {
    let sumOItems = 0;
    items.forEach((i) => {
      sumOItems += i.quantity * i.product.discountPrice;
    });
    sessionStorage.setItem(CART_SUB_TOTAL, JSON.stringify(sumOItems));
    this.subTotal.next(sumOItems);
  }

  removeCartItem(cartItems: any, index: number) {
    cartItems.splice(index, 1);
    sessionStorage.setItem(CART_ITEM, JSON.stringify(cartItems));
    let length = 0;
    cartItems.forEach((i) => {
      length += i.quantity;
    });
    sessionStorage.setItem(CART_LENGTH, length + '');
    this.lengthSource.next(length);
    this.calculateSubTotal(cartItems);
    return cartItems;
  }

  removeAll() {
    sessionStorage.removeItem(CART_ITEM);
    sessionStorage.removeItem(CART_LENGTH);
    sessionStorage.removeItem(CART_SUB_TOTAL);
    this.lengthSource.next(0);
    this.subTotal.next(0);

    return [];
  }
}
