import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountsService } from 'src/app/services/accounts.service';

@Component({
  selector: 'app-others-transfer-summary',
  templateUrl: './others-transfer-summary.page.html',
  styleUrls: ['./others-transfer-summary.page.scss'],
})
export class OthersTransferSummaryPage implements OnInit, OnDestroy {

  destinationData: any = null;
  lastTransferData: any = null;

  constructor(
    private router: Router,
    public accountsService: AccountsService,

  ) { }

  ngOnInit() {

    this.destinationData = this.accountsService.selectedDestinationAccount;
    this.lastTransferData = this.accountsService.lastTransferOperation;
  }

  backToHome(){
    this.router.navigateByUrl("/home");
  }

  ngOnDestroy(){
    console.log("Cleaning scanned account");
    this.accountsService.cleanSelectedAccount();
  }
}
