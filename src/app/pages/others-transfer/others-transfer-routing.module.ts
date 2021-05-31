import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OthersTransferPage } from './others-transfer.page';

const routes: Routes = [
  {
    path: '',
    component: OthersTransferPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OthersTransferPageRoutingModule {}
