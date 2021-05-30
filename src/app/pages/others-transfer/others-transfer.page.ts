import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountsService } from 'src/app/services/accounts.service';
import { CustomersService } from 'src/app/services/customers.service';

@Component({
  selector: 'app-others-transfer',
  templateUrl: './others-transfer.page.html',
  styleUrls: ['./others-transfer.page.scss'],
})
export class OthersTransferPage implements OnInit {

  destinationData: any = null;
  form: FormGroup;
  accounts: Account[];


  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private accountsService: AccountsService,
    private customerService: CustomersService,


  ) { 
    this.createForm();
  }

  ngOnInit() {
    this.loadAccounts();
    this.destinationData = this.accountsService.selectedDestinationAccount;
  }

  loadAccounts(){
    this.accountsService.getAccounts(this.customerService.customerData.email).subscribe((result: Account[]) => {
      this.accounts = result;
      console.log("TRANSFER 3RD PARTY - this.accounts",this.accounts);
    });
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
