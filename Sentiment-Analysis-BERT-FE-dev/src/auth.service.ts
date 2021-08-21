import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { baseURL } from './environments/environment';
import { GlobalService } from './global.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token : string = "";
  constructor( private glo : GlobalService, private toastr: ToastrService, private http: HttpClient) {}


getError(error: any) {
    let message = '';
    if (error.error instanceof ErrorEvent) {
      // handle client-side errors
      message = `Error: ${error.error.message}`;
    } else {
      // handle server-side errors
      message = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    this.showerror('');
    console.log(message);
    return throwError(message);
  }

  register(username:string, email:string, password:string,firstname:string,lastname:string){
    var feilds = {
      "username": username,
      "email": email,
      "password": password,
      "first_name": firstname,
      "last_name": lastname
  }
  const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post(baseURL + 'auth/register/', feilds, { headers: headers });
  }

  login(data: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post(baseURL + 'auth/login/', data, { headers: headers })
      .pipe(
        retry(0),
        catchError(this.getError)
      );
  }
  showerror(msg:any|void) {
    this.toastr.error('Error', msg || 'Parameter invalid');
  }

  

  logout(){
    this.token  = JSON.parse(localStorage.getItem("user")||"").data.token;
    console.log(this.token);
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8')
    .set(
      "Authorization", "Token " + this.token );;
    return this.http.post(baseURL + 'auth/logout/',{}, { headers: headers })
      .pipe(
        catchError(this.getError)
      );
  }


  isStillValid(){
    this.token  = JSON.parse(localStorage.getItem("user")||'{"data":{"token":""}}').data.token;
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8')
    .set(
      "Authorization", "Token " + this.token );;
   return this.http.get(baseURL + 'auth/chek_token/', { headers: headers });
  }


  islogedin(){
     return this.isStillValid();
  }

}
