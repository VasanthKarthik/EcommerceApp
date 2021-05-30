import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notificaion.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  singupForm: FormGroup;
  fullName: FormControl;
  userName: FormControl;
  email: FormControl;
  password: FormControl;
  imageUrl = '.../../assets/images/strawberry.jpg';

  constructor(private route: Router, private notificationService: NotificationService) {
    this.createFormControl();
    this.createForm();
  }

  createFormControl() {
    this.fullName = new FormControl('', Validators.required);
    this.userName = new FormControl('', Validators.required);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]);
  }

  createForm() {
    this.singupForm = new FormGroup({
      fullName: this.fullName,
      userName: this.userName,
      email: this.email,
      password: this.password,
    });
  }

  createAccount() {
    if (this.singupForm.valid) {
      sessionStorage.setItem('new-user', JSON.stringify(this.singupForm.value));
      this.notificationService.showSuccess('User Created Successfully', 'Success');
      this.route.navigateByUrl('/login');
    }
    this.singupForm.reset();
  }

  ngOnInit(): void {}
}
