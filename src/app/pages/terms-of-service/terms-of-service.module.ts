import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { extract } from '../../i18n';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../@shared';
import { TermsOfServiceComponent } from './terms-of-service.component';

const routes: Routes = [
  // Module is lazy loaded, see app-routing.module.ts
  {
    path: '',
    component: TermsOfServiceComponent,
    data: { title: extract('Conquest Advisors - Terms of Service | Conquest') },
  },
];

@NgModule({
  declarations: [TermsOfServiceComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class TermsOfServiceModule {}
