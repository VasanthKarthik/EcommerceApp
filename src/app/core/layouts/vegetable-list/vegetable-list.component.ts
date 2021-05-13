import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProduct } from 'src/app/shared/models/product.model';
import { ProductService } from '../../http/product/product.service';
import { CartService } from '../../services/cart.service';
import { NotificationService } from '../../services/notificaion.service';

@Component({
  selector: 'app-vegetable-list',
  templateUrl: './vegetable-list.component.html',
  styleUrls: ['./vegetable-list.component.css'],
})
export class VegetableListComponent implements OnInit, OnDestroy {
  isVisible: boolean = false;
  vegetableList: IProduct[] = [];
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
        this.vegetableList = response.filter(
          (i) => i.productType === 'Vegetables'
        );
        this.temp = this.vegetableList;
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
      this.vegetableList = this.vegetableList.filter(
        (i) => i.name.toLowerCase() === searchtxt.toLowerCase()
      );
    } else {
      this.vegetableList = this.temp;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
