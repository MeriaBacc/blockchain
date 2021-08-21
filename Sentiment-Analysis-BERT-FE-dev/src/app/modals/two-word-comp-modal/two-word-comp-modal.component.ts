import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-two-word-comp-modal',
  templateUrl: './two-word-comp-modal.component.html',
  styleUrls: ['./two-word-comp-modal.component.css']
})
export class TwoWordCompModalComponent implements OnInit {

  firstword: FormGroup;
  secondeword: FormGroup;
  firstControl = new FormControl();
  secondeControl = new FormControl();
  constructor(fb: FormBuilder) { 
    this.firstword = fb.group({
      first : this.firstControl
    })
    this.secondeword = fb.group({
      first : this.secondeControl
    })
  }

  ngOnInit(): void {
  }
  searchFirst(){

  }
  searchSeconde(){
    
  }
}
