import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { FormInputErrorComponent } from './form-input-error.component';



@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule],
  declarations: [FormInputErrorComponent],
  exports: [FormInputErrorComponent]
})
export class FormInputErrorComponentModule {}
