import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.page.html',
  styleUrls: ['./account-detail.page.scss'],
})
export class AccountDetailPage implements OnInit {

  constructor(
    private barcodeScanner: BarcodeScanner
  ) { }

  ngOnInit() {
  }

  async getQRCode(){
    console.log("Generating qr code");
    const resultGenerate = await this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE,"Test generating barcode");
    console.log("YAGI - resultGenerate - resultGenerate=",resultGenerate);
    console.log("YAGI - resultGenerate - resultGenerate (JSON)=",JSON.stringify(resultGenerate));
  }
}
