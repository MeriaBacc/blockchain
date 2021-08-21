import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GlobalService } from 'src/global.service';
import { ProjectService } from 'src/project.service';
import { CreatePrjectModalComponent } from '../modals/create-prject-modal/create-prject-modal.component';
import { Project } from '../Models/project.model';

@Component({
  selector: 'app-client-space',
  templateUrl: './client-space.component.html',
  styleUrls: ['./client-space.component.css']
})
export class ClientSpaceComponent implements OnInit {
  projects :Project[] = [];
  fullname :string = "" ;
  constructor(private proSer : ProjectService,
     private glo : GlobalService,
      private router: Router,
      public dialog: MatDialog) {}
  

  ngOnInit(): void {
    this.fullname = this.glo.user.getFullName();
     this.getprojects();
     console.log(this.fullname)
  }
  getprojects(){
    this.projects = [];
    this.proSer.getProjects().subscribe(
      (response) => {
        if (response) {
          response.forEach((element: { title: string; discription: string; api_token: string; id: string; }) => {
            var prjt = new Project();
            prjt.title= element.title;
            prjt.discription = element.discription;
            prjt.api_token = element.api_token;
            prjt.id = element.id;
            this.projects.push(prjt);
          });
        } else {
        }
  
      }
    );
  }
  create_project(title:string,discription:string){
    this.proSer.create(title,discription).subscribe(result =>{
      if(result){
        this.getprojects();
      }
    });
  }

  openDialogProject() {
    const dialogRef = this.dialog.open(CreatePrjectModalComponent, {
      height: '500px',
      width: '900px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getprojects();
    });
  }


}
