import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProduct } from 'src/app/shared/models/product.model';
import { ProductService } from '../../http/product/product.service';
import { CartService } from '../../services/cart.service';
import { NotificationService } from '../../services/notificaion.service';

@Component({
  selector: 'app-fruit-list',
  templateUrl: './fruit-list.component.html',
  styleUrls: ['./fruit-list.component.css'],
})
export class FruitListComponent implements OnInit, OnDestroy {
  isVisible: boolean = false;
  fruitList: IProduct[] = [];
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
        this.fruitList = response.filter((i) => i.productType === 'Fruits');
        this.temp = this.fruitList;
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
      this.fruitList = this.fruitList.filter((i) =>
        i.name.toLowerCase().includes(searchtxt.toLowerCase())
      );
    } else {
      this.fruitList = this.temp;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
