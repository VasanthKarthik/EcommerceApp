import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProduct } from 'src/app/shared/models/product.model';
import { ProductService } from '../../http/product/product.service';
import { CartService } from '../../services/cart.service';
import { NotificationService } from '../../services/notificaion.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  isVisible: boolean = false;
  products: IProduct[] = [];
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
        this.products = response;
        this.temp = this.products;
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
      product.name + ' added to cart Successfully.',
      'Success'
    );
  }

  goToPreview(product: IProduct) {
    this.route.navigate(['categories', 'products', product.id], {
      state: { product: product },
    });
  }

  searchProduct() {
    let searchtxt = this.searchForm.value.searchText;
    if (searchtxt) {
      this.products = this.products.filter((i) =>
        i.name.toLowerCase().includes(searchtxt.toLowerCase())
      );
    } else {
      this.products = this.temp;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
