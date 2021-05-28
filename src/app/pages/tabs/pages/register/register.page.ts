import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray  } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ValidationsService } from 'src/app/services/validations.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
    private validators: ValidationsService,
    private utils: UtilsService
  ) {
    this.createForm();
   }

  ngOnInit() {
  }

  createForm(){
    this.form = this.formBuilder.group({
      email:['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
      password1:['', [Validators.required, Validators.minLength(6)]],
      password2:['', [Validators.required, Validators.minLength(6)]],
    },
    {
      validators: [this.validators.samePasswords('password1','password2')]
    });
  }

  async saveForm(){
    // console.log(this.form);
    if (this.form.valid){
      const loading = await this.utils.createLoading();
      
      try {
        await loading.present();
        const body = {
          email: this.form.value.email,
          password: this.form.value.password1
        }
        const result = await this.authService.registerUser(body);
        this.form.reset();
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
