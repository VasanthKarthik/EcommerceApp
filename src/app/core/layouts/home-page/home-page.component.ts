import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;
// import $ from 'jquery'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
    // var $:any;
    $('.carousel').carousel({
      interval: 2000
    })
  }

  goToShop(){
    this.route.navigateByUrl('categories/products')
  }

}
