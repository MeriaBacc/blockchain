import { Component, OnInit } from '@angular/core';
import AOS from 'aos';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  fistdiv: boolean;
  seconddiv: boolean;
  constructor() {
    // let head = <HTMLDivElement> document.head;
    // let style = document.createElement('link');
    // style.innerHTML='';
    // style.type="text/css";
    // style.id="applicationStylesheet";
    // style.rel="stylesheet";
    // style.href='../../assets/xd/HOMEPAGE___4.css';
    // head.appendChild(style);
    // let script = document.createElement('script');
    // script.src="../../assets/xd/HOMEPAGE___4.js";
    // script.id ="applicationScript";
    // head.appendChild(script);

    this.fistdiv = false;
    this.seconddiv = false;
  }
  ngOnInit(): void {
    AOS.init();
  }
  

}
