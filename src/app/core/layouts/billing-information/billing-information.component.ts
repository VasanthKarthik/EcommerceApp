import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-billing-information',
  templateUrl: './billing-information.component.html',
  styleUrls: ['./billing-information.component.css'],
})
export class BillingInformationComponent implements OnInit {
  billingForm: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  phoneNo: FormControl;
  addressLine1: FormControl;
  addressLine2: FormControl;
  city: FormControl;
  state: FormControl;
  country: FormControl;
  pincode: FormControl;

  @Output() activate = new EventEmitter<string>();

  constructor(private route: Router) {
    this.createFormControl();
    this.createForm();
  }

  createFormControl() {
    this.firstName = new FormControl('', Validators.required);
    this.lastName = new FormControl('', Validators.required);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.phoneNo = new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
      Validators.pattern('[0-9]{10}'),
    ]);
    this.addressLine1 = new FormControl('', Validators.required);
    this.addressLine2 = new FormControl('');
    this.city = new FormControl('', Validators.required);
    this.state = new FormControl('', Validators.required);
    this.country = new FormControl('', Validators.required);
    this.pincode = new FormControl('', [
      Validators.required,
      Validators.maxLength(6),
      Validators.pattern('[0-9]{6}'),
    ]);
  }

  createForm() {
    this.billingForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phoneNo: this.phoneNo,
      addressLine1: this.addressLine1,
      addressLine2: this.addressLine2,
      city: this.city,
      state: this.state,
      country: this.country,
      pincode: this.pincode,
    });
  }

  saveBillingInfo() {
    if (this.billingForm.valid) {
      localStorage.setItem(
        'billing-Info',
        JSON.stringify(this.billingForm.value)
      );
      localStorage.setItem('li-active', JSON.stringify(2));
      this.activate.emit('li:second');
      this.route.navigateByUrl('checkout/card-information');
    }
  }

  ngOnInit(): void {}
}
