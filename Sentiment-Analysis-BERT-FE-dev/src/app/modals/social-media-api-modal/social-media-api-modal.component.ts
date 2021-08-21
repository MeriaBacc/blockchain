import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Project } from 'src/app/Models/project.model';
import { ProjectDetailsModalComponent } from 'src/app/project-details-modal/project-details-modal.component';
import { GlobalService } from 'src/global.service';
import { ProjectService } from 'src/project.service';
import { FbTipsModalComponent } from '../fb-tips-modal/fb-tips-modal.component';

@Component({
  selector: 'app-social-media-api-modal',
  templateUrl: './social-media-api-modal.component.html',
  styleUrls: ['./social-media-api-modal.component.css']
})
export class SocialMediaApiModalComponent implements OnInit {

  constructor(    @Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<ProjectDetailsModalComponent>,
  private glo: GlobalService,
  private router: Router,
  private proSer: ProjectService,
  public dialog: MatDialog,
  private httpClient: HttpClient) { }

  public id: any;
  ngOnInit(): void {
    var idd = this.router.url.split('/')
    console.log(idd[idd.length - 1]);
    this.id = idd
    this.proSer.getProject(idd[idd.length - 1]).subscribe(
      result => {
        this.project = result;
        console.log(this.project);
      }
    );
  }
  openDialogTipsFace(){
    const dialogRef = this.dialog.open(FbTipsModalComponent, {
      height: '300px',
      width: '600px',
      data: {project: this.project}

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

    //   social media for one post part 
    project: Project = new Project();
    posts: Array<any> = [];
    analyzing: boolean = false;
    getpost(id_page: string, id_post: string, token_api: string) {
  
      this.proSer.getpost(id_page, id_post, token_api).subscribe(
        (res: any) => {
          console.log(res);
          res.forEach((element: any) => {
            var post: any = {}
            if ("error" in element) {
  
              post["error"] = element["error"];
  
  
            } else {
              for (let key in element) {
                post[key] = element[key];
              }
            }
            this.posts.push(post);
          });
  
  
        }
      );
    }

    analyse_Post(id_page: string, id_post: string, token_api: string) {
      this.posts = [];
      this.analyzing = true;
      var col_id = this.project.collection_id;
      this.proSer.analyse_post(col_id, id_page, id_post, token_api).subscribe(
        (res) => {
          this.analyzing = false;
          if (res == "ok") {
            this.router.navigate(['my_space/project/' + this.project.id + '/results'])
            console.log(res);
          }
  
        }, err => {
  
        }
      );
    }
    fetchAmazonPost(value :string){
      console.log(value)
      this.proSer.getAmazonPost(value, this.project.collection_id).subscribe(r=>{
        console.log(r)
      })
    }
}
