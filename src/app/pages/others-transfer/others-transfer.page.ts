import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-others-transfer',
  templateUrl: './others-transfer.page.html',
  styleUrls: ['./others-transfer.page.scss'],
})
export class OthersTransferPage implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  executeTransfer(){
    this.router.navigateByUrl("/others-transfer-summary");
  }

}
