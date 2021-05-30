import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountsService } from 'src/app/services/accounts.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CustomersService } from 'src/app/services/customers.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
    private customerService: CustomersService,
    private accountsService: AccountsService,
    private utils: UtilsService
  ) {
    this.createForm();
   }

  ngOnInit() {
  }

  createForm(){
    this.form = this.formBuilder.group({
      email:['jo.smith@todo1.com', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
      password:['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async saveForm(){
    if (this.form.valid){
      const loading = await this.utils.createLoading();
      try {
        await loading.present();
        const body = {
          email: this.form.value.email,
          password: this.form.value.password
        }
        const result = await this.authService.loginUser(body);
        const customer = await this.customerService.getCustomerInfo(this.form.value.email).toPromise();//.subscribe(userSnapchot => localStorage.setItem("customerData",JSON.stringify(userSnapchot)));
        this.customerService.customerData = customer;
        //const accounts = await this.accountsService.getAccounts(this.form.value.email).toPromise();
        console.log("CUSTOMER TOPROMISE = ",customer);
        //console.log("ACCOUNTS TOPROMISE = ",accounts);
        this.form.reset({email: "jo.smith@todo1.com"});
        
        console.log("saveform customer data:", this.customerService.customerData);        //await this.customerService.getUserInfo().then(resp => console.log(resp));
        //await this.customerService.getUserInfo().then(resp => console.log(resp));
        this.router.navigateByUrl("/home");
      } catch (error) {
        const alert = await this.utils.createAlert(error.message, "Error");
        await alert.present();
      } finally{
        loading.dismiss();
      }
    }
    return;
  }

}
