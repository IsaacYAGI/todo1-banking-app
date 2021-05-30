import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-others-transfer',
  templateUrl: './others-transfer.page.html',
  styleUrls: ['./others-transfer.page.scss'],
})
export class OthersTransferPage implements OnInit {

  form: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
  ) { 
    this.createForm();
  }

  ngOnInit() {
  }

  createForm(){
    this.form = this.formBuilder.group({
      source_account:[null, [Validators.required]],
      amount:['', [Validators.required]],
      description:['', [Validators.required]],
    });
  }
  
  executeTransfer(){
    this.router.navigateByUrl("/others-transfer-summary");
  }

}
