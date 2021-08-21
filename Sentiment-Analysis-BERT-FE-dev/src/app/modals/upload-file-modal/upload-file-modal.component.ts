import { Component, Inject, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Project } from 'src/app/Models/project.model';
import { UploadService } from 'src/app/upload.service';
import { GlobalService } from 'src/global.service';
import { ValidateDataModalComponent } from '../validate-data-modal/validate-data-modal.component';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/project.service';
import { Router } from '@angular/router';
import { ThemePalette } from '@angular/material/core';
import {ProgressBarMode} from '@angular/material/progress-bar';


@Component({
  selector: 'app-upload-file-modal',
  templateUrl: './upload-file-modal.component.html',
  styleUrls: ['./upload-file-modal.component.css']
})
export class UploadFileModalComponent implements OnInit {

  selectedfile : boolean=false
  activated : boolean=false
  file: any;
  arrayBuffer: any;
  title: any;
  size: any;
  filelist: any;
  tab: string = "upload";
  project: Project = new Project();
  myVar: boolean=true
  public id: any;

  color: ThemePalette = 'warn';
  mode: ProgressBarMode = 'determinate';
  value :number = 0;
  bufferValue = 75;
  uploadsucess = false

  validateFile: boolean=false

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UploadFileModalComponent>,
    private glo: GlobalService,
    private upld: UploadService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private proSer: ProjectService,
    private router: Router
  ) { }

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

  random_token_gene(){
    var stringArray = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','!','?'];
    var rndString= '';
    for (var i = 1; i < 16; i++) { 
      var rndNum = Math.ceil(Math.random() * stringArray.length) - 1;
      rndString = rndString + stringArray[rndNum];
    };
    return rndString;
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

      this.openDialogUploaddata()

      console.log(this.title);
      let element: HTMLElement = document.getElementById('modelclick') as HTMLElement;
      element.click();
    }

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
      this.toastr.success('done', res);
      this.uploadsucess = true
      //setTimeout(() => this.dialogRef.close(), 5000);

    });
    var getprgress = setInterval(()=>{
      this.upld.get_progress(task_token).subscribe((res:any) =>{
        console.log(res);
        var width_div = res.progress / res.total * 100 ;
        this.value = width_div
        if ( width_div == 100) clearInterval(getprgress);
        var pre_width_div = Number.parseInt( element.style.width.replace("%",""));
        if ( pre_width_div < width_div )
        element.style.width = width_div+"%";
  
      })
    },1000)
  }

  onValidClick(): void {
    this.dialogRef.close();
  }

  openDialogUploaddata() {
    const dialogRef = this.dialog.open(ValidateDataModalComponent , {
      height: '550px',
      width: '900px',
      data: { 
        title: this.title,
        size: this.size,
        filelist: this.filelist,
        validateFile : this.validateFile
      }
    }  );

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.uplfile()
        this.myVar = false
        console.log(this.myVar);
      }
      console.log("Dialog result:" + result);
    });
  }

  seeResult(){
    console.log("see result clicked")
    this.router.navigate(['my_space/project/'+this.project.id+'/results']);
  }
}
