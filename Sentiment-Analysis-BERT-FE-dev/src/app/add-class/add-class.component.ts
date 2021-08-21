import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild ,OnInit} from '@angular/core';
import {MatChipInputEvent} from '@angular/material/chips';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from 'src/project.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.css']
})
export class AddClassComponent implements OnInit {
  allclasses :string[] = ['Functionality','Reliability','Usability ','Urgent','Support','Bugs','Time','Experience','Issue','Availability','Request','Question','Performance','Technical','Place']

  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  classes: String[] = [];

  constructor( private tostr : ToastrService, private projectService: ProjectService,private route : ActivatedRoute,private router: Router){

  }

  addclas(clas:string){
    this.classes.push(clas);
    console.log(this.classes)
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.classes.push(value);
    }
    console.log(this.classes)

    // Clear the input value
    event.input.value=''
  }

  remove(cls: String): void {
    const index = this.classes.indexOf(cls);

    if (index >= 0) {
      this.classes.splice(index, 1);
    }
  }
  submitclasses(){
    if(this.classes.length === 0){
      this.tostr.error("First you need to add classes !");
    }
    else{
      var id: string = this.route.snapshot.paramMap.get("id") || "";
      var lastChar = id.substr(id.length - 1);
      var str = this.classes.join(); 
      if(this.projectService.add_classes(id,str).subscribe((response)=>{
        console.log(response)
      })){
        console.log("classes added sucess")
        this.router.navigate(['my_space/project/',id]);
      }
      
    }
  }
  ngOnInit(){
    const id: string = this.router.url;
    var lastChar = id.substr(id.length - 1);
    console.log(lastChar)
  }
}