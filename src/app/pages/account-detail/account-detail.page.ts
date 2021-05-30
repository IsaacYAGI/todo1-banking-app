import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Account } from 'src/app/interfaces/account';
import { AccountsService } from 'src/app/services/accounts.service';
import { CustomersService } from 'src/app/services/customers.service';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.page.html',
  styleUrls: ['./account-detail.page.scss'],
})
export class AccountDetailPage implements OnInit {

  accountDetail: Account = null;
  accountNumber: string;
  constructor(
    private barcodeScanner: BarcodeScanner,
    private accountsService: AccountsService,
    private customerService: CustomersService,
    private activatedRoute :   ActivatedRoute,

  ) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe(params => {
      this.accountNumber = params.accountNumber;
    });

    this.accountsService.getAccount(this.customerService.customerData.email, this.accountNumber).subscribe((account: any) => this.accountDetail = account)
    this.accountsService.getAccountMovements(this.customerService.customerData.email, this.accountNumber).subscribe((movements: any) => {
      this.accountDetail.movements = movements;
      // console.log(this.accountDetail);
    })
  }

  async getQRCode(){
    console.log("Generating qr code");
    const resultGenerate = await this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE,"Test generating barcode");
    console.log("YAGI - resultGenerate - resultGenerate=",resultGenerate);
    console.log("YAGI - resultGenerate - resultGenerate (JSON)=",JSON.stringify(resultGenerate));
  }
}
