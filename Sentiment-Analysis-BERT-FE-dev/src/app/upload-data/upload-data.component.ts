
import { Component, OnInit } from '@angular/core';
import { UploadService } from '../upload.service';

@Component({
  selector: 'app-upload-data',
  templateUrl: './upload-data.component.html',
  styleUrls: ['./upload-data.component.css']
})
export class UploadDataComponent implements OnInit {

  //fileToUpload : File =null;


  constructor(private uploadService: UploadService) { 
    
  }
  click(files: FileList) : void {

    //this.fileToUpload = files.item(0);
    const formData: FormData = new FormData();
    //formData.append('fileKey', this.fileToUpload, this.fileToUpload.name);
    
  }


  ngOnInit(): void {
  }

}
