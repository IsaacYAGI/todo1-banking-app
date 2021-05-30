import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OthersTransferPageRoutingModule } from './others-transfer-routing.module';

import { OthersTransferPage } from './others-transfer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OthersTransferPageRoutingModule
  ],
  declarations: [OthersTransferPage]
})
export class OthersTransferPageModule {}
