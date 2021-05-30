import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
declare var $: any; // ADD THIS
import 'jquery';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../authentication/authentication.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean;
  @Output() isLoginOrSignup = new EventEmitter();
  isPopupVisible: boolean = false;
  noOfCartItems: number = 0;
  authSubscription: Subscription;
  cartSubscription: Subscription;
  userName: any;

  constructor(
    private route: Router,
    private authService: AuthenticationService,
    private cartService: CartService
  ) {
    this.authSubscription = this.authService.login$.subscribe((value) => {
      this.isLoggedIn = value;
    });
  }

  ngOnInit() {
    this.cartSubscription = this.cartService.cartLength$.subscribe((value) => {
      this.noOfCartItems = value;
    });
    this.noOfCartItems = JSON.parse(sessionStorage.getItem('cart-length'))
      ? JSON.parse(sessionStorage.getItem('cart-length'))
      : 0;
    this.userName = JSON.parse(sessionStorage.getItem('current-user'))
    ? JSON.parse(sessionStorage.getItem('current-user')).userName
    : '';
    this.userName = this.userName.length <=15 ? this.userName : this.userName.substr(0,12)+'...';
  }

  showPopOver() {
    this.isPopupVisible = !this.isPopupVisible;
  }

  goToLogin() {
    this.isLoginOrSignup.emit('login');
    this.route.navigateByUrl('/login');
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
    this.cartSubscription.unsubscribe();
  }
}
