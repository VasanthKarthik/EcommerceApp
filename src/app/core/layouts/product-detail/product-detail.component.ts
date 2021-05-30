import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/shared/models/product.model';
declare var $: any; // ADD THIS
import 'jquery';
import { FormControl, FormGroup } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { NotificationService } from '../../services/notificaion.service';

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

  constructor(
    private route: Router,
    private cartService: CartService,
    private notificationService: NotificationService
  ) {
    this.quantity = new FormControl('1');
    this.quantityForm = new FormGroup({
      quantity: this.quantity,
    });
  }

  ngOnInit(): void {
    this.product = history.state['product'];
    if (!this.product) {
      this.route.navigateByUrl('/categories');
    }
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
    this.cartService.addToCart(
      product,
      Number(this.quantityForm.value.quantity)
    );
    this.notificationService.showSuccess(
      product.name + ' added to cart Successfully.',
      'Success'
    );
  }
}
