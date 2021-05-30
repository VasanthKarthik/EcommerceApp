import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { getValidationConfigFromCardNo } from 'src/app/shared/helpers/credit-card.helper';
import { luhnValidator } from 'src/app/shared/validators/lunh-validator';
import { CartService } from '../../services/cart.service';
import { NotificationService } from '../../services/notificaion.service';

@Component({
  selector: 'app-card-information',
  templateUrl: './card-information.component.html',
  styleUrls: ['./card-information.component.css'],
})
export class CardInformationComponent implements OnInit {
  ccForm: FormGroup;
  cardType: FormControl;
  cardHolderName: FormControl;
  ccNumber: FormControl;
  ccExpiryDate: FormControl;
  ccCVV: FormControl;

  @Output() activate = new EventEmitter();
  constructor(
    private route: Router,
    private notificationService: NotificationService,
    private cartService: CartService
  ) {
    this.createFormControl();
    this.createForm();
  }

  ngOnInit(): void {
    $('#cc-exp-date')['datepicker']({
      autoclose: true,
      minViewMode: 1,
      format: 'mm/yy',
    });
  }

  createForm() {
    this.ccForm = new FormGroup({
      cardType: this.cardType,
      cardHolderName: this.cardHolderName,
      ccNumber: this.ccNumber,
      ccExpiryDate: this.ccExpiryDate,
      ccCVV: this.ccCVV,
    });
  }

  createFormControl() {
    this.cardType = new FormControl('mastercard', Validators.required);
    this.cardHolderName = new FormControl('', Validators.required);
    this.ccNumber = new FormControl('', [
      Validators.required,
      Validators.minLength(12),
      luhnValidator(),
    ]);
    this.ccExpiryDate = new FormControl('');
    this.ccCVV = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]);
  }

  getCardNumberControl(): AbstractControl | null {
    return this.ccForm && this.ccForm.get('ccNumber');
  }

  cardMaskFunction(rawValue: string): Array<RegExp> {
    const card = getValidationConfigFromCardNo(rawValue);
    if (card) {
      return card.mask;
    }
    return [/\d/];
  }

  saveCardInfo() {
    if (this.ccForm.valid) {
      sessionStorage.setItem('li-active', JSON.stringify(3));
      this.activate.emit('li:second');
      this.notificationService.showSuccess(
        'Payment Completed Successfully!',
        'success'
      );
      this.cartService.removeAll();
      this.route.navigateByUrl('checkout/success-message');
    }
  }
}
