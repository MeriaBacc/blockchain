import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/auth.service';
import {Router} from "@angular/router"
import { GlobalService } from 'src/global.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'marketing';
  Chatbot: boolean;
  isLogedIn : boolean = false;

  constructor(private glo : GlobalService, private router: Router,private logS: AuthService) {
    this.Chatbot = false;
  }

  links = [
    {label: 'HOME', path:''},
    {label: 'ABOUT', path:'/about'},
    {label: 'PACKAGE', path:'/our_package'},
    {label: 'SERVICES', path:'/service'},
    {label: 'BLOG', path:'/about'},
    {label: 'PODCAST', path:'/podcast'},
  ];

  ngOnInit(): void {
this.logS.islogedin().subscribe(res => {
      this.isLogedIn = (res == 'ok');
    }, (err)=>{
      localStorage.removeItem('user');
    }
    );
  }
  user : any = {}
 
  loginservice(u: string, p: string) {
    var data = {
      "username": u,
      "password": p
    }
    this.logS.login(data).subscribe((response) => {
      if (response) {
        console.log(response);
        localStorage.setItem('user', JSON.stringify(response));
        this.glo.decodeuser();
        this.router.navigate(['/my_space'])
        this.isLogedIn = true;
      } 

    }
    );
  }
  logout(){
    this.logS.logout().subscribe(res=>{
      localStorage.removeItem('user');
    this.isLogedIn =false;
    this.router.navigate(['']);
    });

  }
  signUp(username:string, email:string, password:string,firstname:string,lastname:string){
    this.logS.register(username,email,password,firstname,lastname).subscribe(
      (res)=>{
        console.log(res);
      }
    );
  }
}

