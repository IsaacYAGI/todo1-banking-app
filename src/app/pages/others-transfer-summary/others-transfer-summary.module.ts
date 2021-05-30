import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OthersTransferSummaryPageRoutingModule } from './others-transfer-summary-routing.module';

import { OthersTransferSummaryPage } from './others-transfer-summary.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OthersTransferSummaryPageRoutingModule
  ],
  declarations: [OthersTransferSummaryPage]
})
export class OthersTransferSummaryPageModule {}
