import { Injectable } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    public loadingCtrl: LoadingController,
    public alertController: AlertController,
  ) { }

  async createLoading(message = "Please wait...") {
    const loader = this.loadingCtrl.create({
      message: message
    });
    return loader;
  }

  async createAlert(message, header = "Information") {
    const alert = this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    return alert;
  }

}
