import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  email: string = "";
  constructor(
    public auth: AuthenticationService,
    private router: Router,
    private utils: UtilsService
  ) {
    auth.userDetails().subscribe(val => this.email = val?.email);
   }

  ngOnInit() {
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
}
