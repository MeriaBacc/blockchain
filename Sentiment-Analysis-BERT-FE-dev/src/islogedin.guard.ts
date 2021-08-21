import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from './app/Models/user.model';
import { AuthService } from './auth.service';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class IslogedinGuard implements CanActivate {
  constructor( private auth : AuthService, private glo: GlobalService, private _router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //   var user:User = this.glo.user ;
    //   if ( user != null ){
    //     if(user.getdetails() == {"first_name" : "","last_name" : "","email" : ""} ){
    //       console.log(" user in localstorage :" +user);
    //       this._router.navigate(["/"]);
    //     return false;
    //     }
        
    //   }else return false;
      
    // return true;
    if(localStorage.getItem('user') == null) {
      window.alert('Access Denied, Login is Required to Access This Page!')
      this._router.navigate([''])
      return false;
    }
    return true;
  }
  
}
