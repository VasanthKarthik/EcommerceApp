import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProduct } from 'src/app/shared/models/product.model';
import { ProductService } from '../../http/product/product.service';
import { CartService } from '../../services/cart.service';
import { NotificationService } from '../../services/notificaion.service';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css'],
})
export class FoodListComponent implements OnInit, OnDestroy {
  isVisible: boolean = false;
  foodList: IProduct[] = [];
  cartLength: number;
  addProduct: any;
  subscription: Subscription;

  searchForm: FormGroup;
  searchText: FormControl;
  temp: any;

  constructor(
    private productService: ProductService,
    private route: Router,
    private cartService: CartService,
    private notificationService: NotificationService
  ) {
    this.subscription = this.productService
      .getProducts()
      .subscribe((response: IProduct[]) => {
        this.foodList = response.filter((i) => i.productType === 'Food');
        this.temp = this.foodList;
      });

    this.searchText = new FormControl();
    this.searchForm = new FormGroup({
      searchText: this.searchText,
    });
  }

  ngOnInit(): void {}

  @HostListener('mouseover')
  show(): void {
    this.isVisible = true;
  }

  @HostListener('mouseout')
  hide() {
    this.isVisible = false;
  }

  addToCart(product: IProduct) {
    this.cartService.addToCart(product, 1);
    this.notificationService.showSuccess(
      'Product added to cart Successfully.',
      'Success'
    );
  }

  goToPreview(product: IProduct) {
    this.route.navigate(['categories', 'products', product.id], {
      state: product,
    });
  }

  searchProduct() {
    let searchtxt = this.searchForm.value.searchText;
    if (searchtxt) {
      this.foodList = this.foodList.filter(
        (i) => i.name.toLowerCase() === searchtxt.toLowerCase()
      );
    } else {
      this.foodList = this.temp;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
