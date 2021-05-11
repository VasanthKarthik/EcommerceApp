import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/shared/models/product.model';
declare var $: any; // ADD THIS
import 'jquery';
import { FormControl, FormGroup } from '@angular/forms';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  product: IProduct;
  cartLength: number;
  addProduct: any;
  quantityForm: FormGroup;
  quantity: FormControl;
  isStockAvailable: boolean;

  constructor(private route: Router, private cartService: CartService) {
    this.quantity = new FormControl('1');
    this.quantityForm = new FormGroup({
      quantity: this.quantity,
    });
  }

  ngOnInit(): void {
    this.product = history.state;
    this.isStockAvailable = this.product.stockAvailable != 0;
  }

  decrement() {
    if (this.quantityForm.value.quantity > 1) {
      this.quantityForm.value.quantity--;
    }
  }

  increment() {
    this.quantityForm.value.quantity++;
  }

  addToCart(product: IProduct) {
    this.cartService.addToCart(product, this.quantityForm.value.quantity);
  }
}
