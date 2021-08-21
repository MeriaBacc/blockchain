import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/project.service';
import { Project } from '../Models/project.model';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-project-details-modal',
  templateUrl: './project-details-modal.component.html',
  styleUrls: ['./project-details-modal.component.css']
})
export class ProjectDetailsModalComponent implements OnInit {

  tiles: Tile[] = [
    {text: 'Project Details', cols: 3, rows: 1, color: '#F66734'},
    {text: 'Two', cols: 1, rows: 5, color: ''},
    {text: 'Project Title', cols: 1, rows: 1, color: '#FEC9B2'},
    {text: this.data.project.title , cols: 2, rows: 1, color: '#FEC9B2'},
    {text: 'Project Description', cols: 1, rows: 1, color: '#FFB595'},
    {text: this.data.project.discription, cols: 2, rows: 1, color: '#FFB595'},
    {text: 'Creation date', cols: 1, rows: 1, color: '#FEC9B2'},
    {text: this.data.project.created_time.split("T")[0], cols: 2, rows: 1, color: '#FEC9B2'},
    {text: 'Creation time', cols: 1, rows: 1, color: '#FFB595'},
    {text: this.data.project.created_time.split("T")[1], cols: 2, rows: 1, color: '#FFB595'},
    {text: 'Creation Classes', cols: 1, rows: 1, color: '#FEC9B2'},
    {text: this.data.project.class_list, cols: 2, rows: 1, color: '#FEC9B2'},
  ];

  public id: any;
  project: Project = new Project();
  codestr: string = "";

  constructor(
    private proSer: ProjectService,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ProjectDetailsModalComponent>,
  ) { }



  code() {
    var x = this.project.api_token;
    var y = `import requests 
import json
headers = { "Authorization" : "Token XXX"}
project_api_tok = '${x}'

url = "http://localhost:8000/api/v1/"
data = [ {
        "post_content" : "this is the post 1",
        "comments" : ["comment 1", "comment 2", "comment 3", "comment 4"]
    } , {
        "post_content" : "this is the post 2",
        "comments" : ["comment 1", "comment 2", "comment 3", "comment 4"]
    } ]
data = json.dumps(data)
response = requests.request("POST", url+project_api_tok+'/posts', 
                            data={"data_to_analyse":data}, headers=headers)
print(response.status_code)`.replace('xxxx', x);
    console.log(y);

    return y;
  }

  ngOnInit(): void {
    console.log(this.data)
    console.log(this.data.project.id)
    console.log(this.data.project.id)
    var id1: string = this.router.url
    this.id = this.route.snapshot.paramMap.get('id');
    var newstr = id1.split("/")
    console.log(newstr[newstr.length-1])
    console.log(this.router.url)
    this.proSer.getProject(newstr[newstr.length-1]).subscribe(
      result => {
        this.project = result;
        console.log(this.project);
      }
    );
    this.codestr = this.code();
  }

}
