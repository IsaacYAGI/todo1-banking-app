import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-others-transfer-summary',
  templateUrl: './others-transfer-summary.page.html',
  styleUrls: ['./others-transfer-summary.page.scss'],
})
export class OthersTransferSummaryPage implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  backToHome(){
    this.router.navigateByUrl("/home");
  }
}
