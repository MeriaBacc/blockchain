import { Injectable } from '@angular/core';
import { User } from './app/Models/user.model';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  user : User = new User();
  constructor() {
    this.user = this.decodeuser();
   }
  decodeuser():User{
    var userStr = localStorage.getItem('user');
    if(userStr != null){
      var userJson =JSON.parse(userStr);
      var user:User = new User();
      user.setvalues(
        userJson.data.user.id,
        userJson.data.user.firstname,
        userJson.data.user.lastname,
        userJson.data.user.email,
        userJson.data.token
      );
    return user;
    }
    return new User();
    
    
  }
  
}
