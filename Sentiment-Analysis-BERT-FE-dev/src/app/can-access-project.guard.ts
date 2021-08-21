import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProjectService } from 'src/project.service';

@Injectable({
  providedIn: 'root'
})
export class CanAccessProjectGuard implements CanActivate {
  constructor(private project_guard : ProjectService, private route : Router, private tostr : ToastrService){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.get_classes(route.params["id"]);
    
  }


  get_classes (id :string) :  Observable<boolean>{
     return this.project_guard.getProject_from_guard(id).pipe(
       map((res:any)=>{
        if (res["class_list"] != ""){
          return true;
        }
        this.tostr.info("Fist you need to add classes !");
        this.route.navigate(["my_space/add_class/"+id]);
        return false;
       }
    ),);
  }



}
