import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { WeatherService } from 'src/app/services/weather.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Account } from 'src/app/interfaces/account';
import { AccountsService } from 'src/app/services/accounts.service';
import { CustomersService } from 'src/app/services/customers.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  email: string = ""; 
  weather: any = null;
  accounts: Account[];
  constructor(
    public auth: AuthenticationService,
    private router: Router,
    private utils: UtilsService,
    private geolocation: Geolocation,
    private weatherService: WeatherService,
    private barcodeScanner: BarcodeScanner,
    private accountsService: AccountsService,
    private customerService: CustomersService,


  ) {
    auth.userDetails().subscribe(val => this.email = val?.email);
   }

  ngOnInit() {
    this.loadWeather()
    this.loadAccounts();
  }

  loadAccounts(){
    this.accountsService.getAccounts(this.customerService.customerData.email).subscribe((result: Account[]) => {
      this.accounts = result;
      console.log(this.accounts);
    });
  }
  async loadWeather(){
    try {
      const location = await this.geolocation.getCurrentPosition({timeout:10000, enableHighAccuracy:true});

      console.log("YAGI - Actual location:", location);
      const resultWeather: any = await this.weatherService.getWeather(location);
      this.weather = resultWeather.weather[0];
    } catch (error) {
      console.log('Error getting location', error);
    }
  }

  async logout(){
    const loading = await this.utils.createLoading();
    try {
      await loading.present();
      await this.auth.logoutUser();
      this.router.navigateByUrl("/tabs/login");
    } catch (error) {
      console.error(error);
    }finally{
      loading.dismiss();
    }
  }

  showDetail(){
    this.router.navigateByUrl("/account-detail");
  }

  async transfer(){
    //const resultBarcode = await this.barcodeScanner.scan();
    //console.log("YAGI - TRANSFER - BARCODE SCANNER=",JSON.stringify(resultBarcode));
    // const resultString = JSON.stringify(resultBarcode);
    // alert(resultString);
    this.router.navigateByUrl("/others-transfer");
  }
}
