import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from 'src/project.service';

@Component({
  selector: 'app-create-prject-modal',
  templateUrl: './create-prject-modal.component.html',
  styleUrls: ['./create-prject-modal.component.css']
})
export class CreatePrjectModalComponent implements OnInit {

  constructor(private proSer : ProjectService,
    private tostr : ToastrService,
    public dialogRef: MatDialogRef<CreatePrjectModalComponent>) { }

  ngOnInit(): void {
  }

  create_project(title:string,discription:string){
    this.proSer.create(title,discription).subscribe(result =>{
      if(result){
        console.log("project created sucessfully")
        this.tostr.success("project crated sucessfully");
        this.dialogRef.close();
      }
    });
  }

  onCreateClick(){
    this.dialogRef.close();
  }
}
