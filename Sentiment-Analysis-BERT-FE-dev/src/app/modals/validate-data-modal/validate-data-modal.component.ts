import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-validate-data-modal',
  templateUrl: './validate-data-modal.component.html',
  styleUrls: ['./validate-data-modal.component.css']
})
export class ValidateDataModalComponent implements OnInit {

  value = 'Clear me';

  constructor( @Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<ValidateDataModalComponent>,) { }

  ngOnInit(): void {
    console.log(this.data)
  }

  onNoClick(){
    this.dialogRef.close();
    this.data.validateFile=false;
    console.log("validate file closed with NO and data = ",this.data)

  }
  onOkClick(){
    this.dialogRef.close();
    this.data.validateFile=true;
    console.log("validate file closed with OK and data = ",this.data)
  }
}
