import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/Models/project.model';
import { GlobalService } from 'src/global.service';
import { ProjectService } from 'src/project.service';

@Component({
  selector: 'app-auto-data-send-modal',
  templateUrl: './auto-data-send-modal.component.html',
  styleUrls: ['./auto-data-send-modal.component.css']
})
export class AutoDataSendModalComponent implements OnInit {

  public id: any;
  project: Project = new Project();
  constructor(
    private glo: GlobalService,
    private route: ActivatedRoute,
    private proSer: ProjectService,
    private router: Router
    ) {}

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
    this.codestr = this.code();
  }

  token = this.glo.decodeuser().getToken().toString();
  codestr: string = "";
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
}
