import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { NotificationService } from 'src/app/core/services/notificaion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  userName: FormControl;
  password: FormControl;
  imageUrl = '.../../assets/images/strawberry.jpg';

  constructor(
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService,
    private route: Router
  ) {
    this.createFormControl();
    this.createForm();
  }

  createFormControl() {
    this.userName = new FormControl('', Validators.required);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]);
  }

  createForm() {
    this.loginForm = new FormGroup({
      userName: this.userName,
      password: this.password,
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.authenticationService.login(this.loginForm.value);

      setTimeout(() => this.afterLogin(), 500);
    }
  }

  afterLogin(): void {
    if (this.authenticationService.isLogin()) {
      localStorage.removeItem('event');
      localStorage.setItem('isLoggedIn', JSON.stringify(true));
      this.authenticationService.loginSubject.next(true);
      this.notificationService.showSuccess('Login Successfully', 'Success');
      this.route.navigateByUrl('');
    } else {
      this.notificationService.showError(
        'Invalid User Name and Password',
        'Error'
      );
    }
  }

  ngOnInit(): void {}
}
