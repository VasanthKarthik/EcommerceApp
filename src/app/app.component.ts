import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './core/authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'EcommerceApp';
  isLoggedIn: boolean;

  constructor(
    private route: Router,
    private authService: AuthenticationService
  ) {
    this.authService.login$.subscribe((value) => {
      this.isLoggedIn = !value;
    });
    let event = sessionStorage.getItem('event');
    if (event === 'login') {
      this.isLoggedIn = true;
      this.route.navigateByUrl('/login');
    } else {
      this.isLoggedIn = false;
    }
  }

  isLogin(event: any) {
    if (event === 'login') {
      this.isLoggedIn = true;
      sessionStorage.setItem('event', 'login');
      this.route.navigateByUrl('login');
    }
  }
}
