import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/project.service';
import { Project } from '../Models/project.model';
import * as XLSX from 'xlsx';
import { UploadService } from '../upload.service';
import { GlobalService } from 'src/global.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ProjectDetailsModalComponent } from '../project-details-modal/project-details-modal.component';
import { UploadFileModalComponent } from '../modals/upload-file-modal/upload-file-modal.component';
import { SocialMediaApiModalComponent } from '../modals/social-media-api-modal/social-media-api-modal.component';
import { AutoDataSendModalComponent } from '../modals/auto-data-send-modal/auto-data-send-modal.component';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  file: any;
  arrayBuffer: any;
  title: any;
  size: any;
  filelist: any;
  tab: string = "upload";
  project: Project = new Project();
  private socket: any;
  public id: any;
  therisresult :boolean=true
  fullname :string = "" ;


  constructor(
    private glo: GlobalService,
    private toastr: ToastrService,
    private upld: UploadService,
    private proSer: ProjectService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    
    ) {

  }


  

  ngOnInit(): void {
    this.fullname = this.glo.user.getFullName();
    console.log(this.fullname)

    this.id = this.route.snapshot.paramMap.get('id');
    this.proSer.getProject(this.id).subscribe(
      result => {
        this.project = result;
        console.log(this.project);
      }
    );
    this.codestr = this.code();
  }
  change(x: string) {

    this.tab = x;

  }

  openDialog() {
    const dialogRef = this.dialog.open(ProjectDetailsModalComponent, {
      height: '600px',
      width: '1000px',
      data: {project: this.project}

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  openDialogUploaddata() {
    const dialogRef = this.dialog.open(UploadFileModalComponent /* , {
      height: '350px',
      width: '600px',
      data: {project: this.project}
    }  */);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialogAPIData() {
    const dialogRef = this.dialog.open(SocialMediaApiModalComponent, {
      height: '500px',
      width: '900px',
      data: {project: this.project}

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialogSocialData() {
    const dialogRef = this.dialog.open(AutoDataSendModalComponent , {
      height: '500px',
      width: '900px',
      data: {project: this.project}

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  addfile(event: { target: any }) {
    this.file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(this.file);
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      var arraylist = XLSX.utils.sheet_to_json(worksheet, { raw: false });
      this.filelist = arraylist;

      this.title = [];
      Object.keys(this.filelist[0]).forEach(key => {
        this.title.push(key);
      });
      this.size = this.filelist.length;


      console.log(this.title);
      let element: HTMLElement = document.getElementById('modelclick') as HTMLElement;
      element.click();



    }

  }

  getstringfromobj(obj: any) {
    var str: string;
    str = "";
    for (var val in obj) {
      str += "," + obj[val];
    }
    return str.substring(1);
  }
generate_data(elem:any,cnt_id:string,post_id:string){
  var data = {
    'id': this.project.collection_id,
    'line': this.getstringfromobj(elem),
    'type': "0",
    'index_col': "1",
    'post_key': "post",
    'comment_key': "comment",
    'comment_id': cnt_id,
    'post_id':post_id
  }; 
  return data
}
random_token_gene(){
  var stringArray = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','!','?'];
  var rndString= '';
  for (var i = 1; i < 16; i++) { 
    var rndNum = Math.ceil(Math.random() * stringArray.length) - 1;
    rndString = rndString + stringArray[rndNum];
  };
  return rndString;
}
uplfile() {
  var user = this.glo.decodeuser();
  let formData = new FormData();
  var task_token = this.random_token_gene();
  var data = {
    'id': this.project.collection_id,
    'heaad': "True",
    'content_col': "0",
    'index_col': "1",
    'post_key': "post",
    'comment_key': "comment",
    'task_token':task_token
  };
  formData.append('file', this.file);
  formData.append('data', JSON.stringify(data));

  // formData.append('heaad', "True");
  // formData.append('content_col', "0");
  // formData.append('index_col', "1");
  // formData.append('post_key', "post");
  // formData.append('comment_key', "comment");

  var element: HTMLElement = document.getElementById('close_modal') as HTMLElement;
    element.click();
    var element = document.getElementById('pro_bar_div') as HTMLElement;
        element.style.visibility = "visible";
        element = document.getElementById('pro_bar') as HTMLElement;

  this.upld.upload(formData, user.getToken()).subscribe(res => {
    clearInterval(getprgress);
    var element12 = document.getElementById('pro_bar_div') as HTMLElement;
          element12.style.visibility = "hidden";
    this.toastr.success('done', res);
  });
  var getprgress = setInterval(()=>{
    this.upld.get_progress(task_token).subscribe((res:any) =>{
      console.log(res);
      var width_div = res.progress / res.total * 100 ;
      if ( width_div == 100) clearInterval(getprgress);
      var pre_width_div = Number.parseInt( element.style.width.replace("%",""));
      if ( pre_width_div < width_div )
      element.style.width = width_div+"%";

    })
  },1000)
}
  new_uplfile() {
    var user = this.glo.decodeuser();
    var element: HTMLElement = document.getElementById('close_modal') as HTMLElement;
    element.click();
    var element = document.getElementById('pro_bar_div') as HTMLElement;
        element.style.visibility = "visible";
        element = document.getElementById('pro_bar') as HTMLElement;

    this.filelist.forEach(async (elem: any, index: number) => {
      
      var formData = new FormData();

      var cnt_id = "0";
      var post_id = "0";
      var data =this.generate_data(elem, cnt_id, post_id); 
      formData.append('data', JSON.stringify(data));
       await ( this.upld.new_upload(formData, user.getToken())).then(res=>{
        console.log(res);
        if(res.status == "done") {
          post_id = res.post_id;
          cnt_id = res.comment_id;
        }
        console.log(" index       ---- " + index);
        var width_div = (index+1) / this.filelist.length * 100 ;
        var pre_width_div = Number.parseInt( element.style.width.replace("%",""));
        if ( pre_width_div < width_div )
        element.style.width = width_div+"%";
        if (width_div == 100){
          var element12 = document.getElementById('pro_bar_div') as HTMLElement;
          element12.style.visibility = "hidden";
      this.toastr.success('done', "end of process");
        }
       });
      
        
     
    });


    //formData.append('file', this.file);


    // formData.append('heaad', "True");
    // formData.append('content_col', "0");
    // formData.append('index_col', "1");
    // formData.append('post_key', "post");
    // formData.append('comment_key', "comment");


    //element =  document.getElementById('waite_until_finish') as HTMLElement;
    //element.style.visibility="visible";


  }

  //   social media for one post part 
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
  // for api clients 
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

  seeResult(){
    this.router.navigate(['my_space/project/'+this.project.id+'/results']);
  }

}

