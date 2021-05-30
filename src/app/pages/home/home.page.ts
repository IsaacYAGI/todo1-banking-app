import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  email: string = ""; 
  weather: any = null;
  
  constructor(
    public auth: AuthenticationService,
    private router: Router,
    private utils: UtilsService,
    private geolocation: Geolocation,
    private weatherService: WeatherService
  ) {
    auth.userDetails().subscribe(val => this.email = val?.email);
   }

  ngOnInit() {
    this.loadWeather()
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

  transfer(){
    this.router.navigateByUrl("/others-transfer");
  }
}
