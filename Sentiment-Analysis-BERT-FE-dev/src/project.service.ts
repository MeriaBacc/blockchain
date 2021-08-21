import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, take } from 'rxjs/operators';
import { baseURL } from './environments/environment';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService  {
  constructor(private glo: GlobalService, private toastr: ToastrService, private http: HttpClient) { }
  
  token : string = "";
  
       getProject_from_guard(id:string) {
    
        this.token = this.glo.decodeuser().getToken();
        var headers = new HttpHeaders()
          .set("Authorization", "Token " + this.token );
       return   this.http.get(baseURL + 'api/create/'+id, { headers: headers });
      }

      getProject(id:string): Observable<any> {
    
        this.token = this.glo.decodeuser().getToken();
        var headers = new HttpHeaders()
          .set("Authorization", "Token " + this.token );
       return  this.http.get(baseURL + 'api/create/'+id, { headers: headers })
          .pipe(
            retry(1),
            catchError(this.getError)
          );
      }






      getResult(id:string): Observable<any> {
        this.token = this.glo.decodeuser().getToken();
    var headers = new HttpHeaders()
      .set("Authorization", "Token " + this.token );
        let formData = new FormData();
        formData.set('id',id);
    
        return this.http.post(baseURL + 'api/result/',formData,{headers:headers})
          .pipe(
            retry(1),
            catchError(error => {
              return this.getError(error);
            } )
          );
      }
  getProjects(): Observable<any> {
    this.token = this.glo.decodeuser().getToken();
    var headers = new HttpHeaders()
      .set("Authorization", "Token " + this.token );
    
    
    return this.http.get(baseURL + 'api/create/', { headers: headers })
      .pipe(
        catchError(error => {
          return this.getError(error);
        } )
      );
  }
  create(title:string,discription:string): Observable<any> {
    
    this.token = this.glo.decodeuser().getToken();
    var headers = new HttpHeaders()
      .set("Authorization", "Token " + this.token );
    return this.http.post(baseURL + 'api/create/', {"title" : title, "discription" : discription }, { headers: headers })
      .pipe(
        catchError(this.getError)
      );
  }
  


  add_classes(id:string, class_list:string) {
    this.token = this.glo.decodeuser().getToken();
    
    var headers = new HttpHeaders().set("Authorization", "Token " + this.token );
    
    var jobj = {
      "id" : id,
      "class_list" : class_list 
    }
    console.log(jobj)
    return this.http.post(baseURL + 'api/add_class/', jobj, { headers: headers });
  }
















//  social media part 
  getpost(id_page:string, id_post:string, token_api:string){
    this.token = this.glo.decodeuser().getToken();
    var headers = new HttpHeaders()
      .set("Authorization", "Token " + this.token );
    let formData = new FormData();
    formData.append('id_page',id_page);
    formData.append('id_post',id_post);
    formData.append('token',token_api);
    return this.http.post(baseURL+'api/fb_api/get_post',formData,{ headers: headers })
    .pipe(
      catchError(error=>{
        let msg = error.error.message;
        return throwError(msg);
      })
    );
  }
  analyse_post(col_id:string, id_page:string, id_post:string, token_api:string){
    this.token = this.glo.decodeuser().getToken();
    var headers = new HttpHeaders()
      .set("Authorization", "Token " + this.token );
    let formData = new FormData();
    formData.append('id_page',id_page);
    formData.append('id_post',id_post);
    formData.append('token',token_api);

    formData.append('col_id',col_id);

    return this.http.post(baseURL+'api/fb_api/analyse_post',formData,{ headers: headers })
    .pipe(
      catchError(error=>{
        let msg = error.error.message;
        return throwError(msg);
      })
    );
  }

 getAmazonPost(value : string,id:string){
  this.token = this.glo.decodeuser().getToken();
  var headers = new HttpHeaders().set("Authorization", "Token " + this.token );
  var jobj = {
    "URL" : value,
    "id":  id
  }
  return this.http.post(baseURL + 'api/amz_scrap/', jobj, { headers: headers });
 }














  getError(error:any) {
    let message = '';
    if (error.error instanceof ErrorEvent) {
      // handle client-side errors
      message = `Error: ${error.error.message}`;
    } else {
      // handle server-side errors
      message = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    this.toastr.error('Error', message);
    console.log(message);
    return throwError(message);
  }
}
