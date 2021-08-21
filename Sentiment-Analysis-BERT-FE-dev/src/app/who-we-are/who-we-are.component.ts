import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-who-we-are',
  templateUrl: './who-we-are.component.html',
  styleUrls: ['./who-we-are.component.css']
})
export class WhoWeAreComponent implements OnInit {

  constructor(private _router : Router) {
    // let head = <HTMLDivElement> document.head;
    // var styl = document.getElementById('applicationStylesheet');
    // while ( styl != null ){
    //   document.getElementById("applicationStylesheet")?.remove();
    //   styl = document.getElementById('applicationStylesheet');
    // }
    // let style = document.createElement('link');
    // style.innerHTML='';
    // style.type="text/css";
    // style.id="applicationStylesheet";
    // style.rel="stylesheet";
    // style.href='../../assets/xd/who_we_are.css';
    // head.appendChild(style);

    // var script = document.getElementById('applicationScript');
    // while ( script != null ){
    //   document.getElementById("applicationScript")?.remove();
    //   script = document.getElementById('applicationScript');
    // }
    // let scrip = document.createElement('script');
    // scrip.id = "applicationScript"
    // scrip.src = "../../assets/xd/who_we_are.js";
    // head.appendChild(scrip);

   }

  ngOnInit(): void {
  }

showMe :boolean=false;

toggleTag(){
  this.showMe =! this.showMe;
}

}
