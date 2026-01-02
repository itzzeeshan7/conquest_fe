import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResidentalComponent } from './residental.component';
import { SharedModule } from '../../@shared';
import { RouterModule, Routes } from '@angular/router';
import { extract } from '../../i18n';

const routes: Routes = [
  // Module is lazy loaded, see app-routing.module.ts
  { path: '', component: ResidentalComponent, data: { title: extract('About | Conquest') } },
];

@NgModule({
  declarations: [ResidentalComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class ResidentalModule {}
