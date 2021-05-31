import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from 'src/app/interfaces/account';
import { Movement } from 'src/app/interfaces/movement';
import { AccountsService } from 'src/app/services/accounts.service';
import { CustomersService } from 'src/app/services/customers.service';
import { UtilsService } from 'src/app/services/utils.service';

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
    private utils: UtilsService
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
  
  get formValid(){
    const selectedAccount = this.accounts[this.form.get('source_account').value];
    return this.form.valid && (this.form.get('amount').value <= selectedAccount.amount);
  }
  
  async executeTransfer(){
    if (!this.formValid){
      const alert = await this.utils.createAlert("The introduced amount can't be higher than the available amount", "Error");
      await alert.present();
      return;
    }
    const loading = await this.utils.createLoading();
    await loading.present();
    let destinationAccount: any = await this.accountsService.getAccountAsPromise(this.destinationData.client_target_email,this.destinationData.account_number).toPromise();
    let currentClientAccount: any = await this.accountsService.getAccountAsPromise(this.customerService.customerData.email,this.accounts[this.form.get("source_account").value].account_number).toPromise();
    
    const amountToTransfer = this.form.get("amount").value;

    destinationAccount.amount = destinationAccount.amount + amountToTransfer;
    currentClientAccount.amount = currentClientAccount.amount - amountToTransfer;
    console.log("destinationAccount:",destinationAccount,"currentClientAccount:", currentClientAccount);
    const resultDestinationTransfer = await this.accountsService.updateAccount(this.destinationData.client_target_email,this.destinationData.account_number, destinationAccount);
    const resultSourceTransfer = await this.accountsService.updateAccount(this.customerService.customerData.email,this.accounts[this.form.get("source_account").value].account_number, currentClientAccount);
    console.log("resultDestinationTransfer:",resultDestinationTransfer);
    console.log("resultSourceTransfer:",resultSourceTransfer);
    
    const transferMovementTarget: Movement = {
      amount: amountToTransfer,
      date: new Date().getTime(),
      description: this.form.get("description").value,
      movement_type: "INCOME",
      target_account:this.destinationData.account_number,
      source_account: this.accounts[this.form.get("source_account").value].account_number
    }

    const resultMovementTarget = await this.accountsService.addMovement(this.destinationData.client_target_email,this.destinationData.account_number, transferMovementTarget);

    const resultMovementSource= await this.accountsService.addMovement(this.customerService.customerData.email,this.accounts[this.form.get("source_account").value].account_number, {
      amount: amountToTransfer,
      date: new Date().getTime(),
      description: this.form.get("description").value,
      movement_type: "OUTCOME",
      target_account:this.destinationData.account_number,
      source_account: this.accounts[this.form.get("source_account").value].account_number
    });
    
    this.accountsService.lastTransferOperation = transferMovementTarget;
    this.accountsService.lastTransferOperation.date = new Date(this.accountsService.lastTransferOperation.date);
    console.log("resultMovementTarget:",resultMovementTarget);
    console.log("resultMovementSource:",resultMovementSource);

    loading.dismiss();
    this.router.navigateByUrl("/others-transfer-summary");
  }

}
