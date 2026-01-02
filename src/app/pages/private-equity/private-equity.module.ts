import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivateEquityComponent } from './private-equity.component';
import { extract } from '../../i18n';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../@shared';

const routes: Routes = [
  // Module is lazy loaded, see app-routing.module.ts
  { path: '', component: PrivateEquityComponent, data: { title: extract('About | Conquest') } },
];

@NgModule({
  declarations: [PrivateEquityComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class PrivateEquityModule {}
