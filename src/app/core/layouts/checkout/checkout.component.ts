import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  progressBar(event: any) {
    let li = localStorage.getItem('li-active')
      ? JSON.parse(localStorage.getItem('li-active'))
      : 0;
    let ele = $('.progressbar').find('li')[li - 1];
    ele.setAttribute('class', 'active');
  }
}
