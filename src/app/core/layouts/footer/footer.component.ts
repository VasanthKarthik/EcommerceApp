import { Component, OnInit } from '@angular/core';
declare var $: any; // ADD THIS
import 'jquery';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.scrollToTop();
  }

  scrollToTop(){
    $('p > a').on('click', function(){
      window.scroll({
        top: 0, 
        left: 0, 
        behavior: 'smooth'
      })
    })
  }

}
