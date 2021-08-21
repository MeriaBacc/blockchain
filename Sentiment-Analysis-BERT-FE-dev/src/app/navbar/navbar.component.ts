import { Component, OnInit  ,AfterViewInit, ViewChild, ElementRef, HostListener} from '@angular/core';
import { AuthService } from 'src/auth.service';
import {Router} from "@angular/router"
import { GlobalService } from 'src/global.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  title = 'marketing';
  Chatbot: boolean;
  isLogedIn : boolean = false;
  isScrolled = false;
  constructor(private glo : GlobalService, private router: Router,private logS: AuthService) {
    this.Chatbot = false;
  }

  @HostListener("window:scroll")
  scrollEvent() {
    window.pageYOffset >= 80 ? (this.isScrolled = true) : (this.isScrolled = false);
  }


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
      
      