import { Injectable } from '@angular/core';
import { Geoposition } from '@ionic-native/geolocation/ngx';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(
    private http: HttpClient
  ) { }

  getWeather(coordinates: Geoposition){

    return this.http.get(`https://fcc-weather-api.glitch.me/api/current?lat=${coordinates.coords.latitude}&lon=${coordinates.coords.longitude}`).toPromise();
    // return this.http.get(`https://fcc-weather-api.glitch.me/api/current?lat=24.7255553&lon=46.5423347`).toPromise();
  }
}
