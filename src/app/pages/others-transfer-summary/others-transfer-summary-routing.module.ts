import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OthersTransferSummaryPage } from './others-transfer-summary.page';

const routes: Routes = [
  {
    path: '',
    component: OthersTransferSummaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OthersTransferSummaryPageRoutingModule {}
