import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success-message',
  templateUrl: './success-message.component.html',
  styleUrls: ['./success-message.component.css']
})
export class SuccessMessageComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  backtoShopPage(){
    this.route.navigateByUrl('categories/products');
  }

}
