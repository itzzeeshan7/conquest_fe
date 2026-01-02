import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { extract } from '../../i18n';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../@shared';
import { PrivacyPolicyComponent } from './privacy-policy.component';

const routes: Routes = [
  // Module is lazy loaded, see app-routing.module.ts
  {
    path: '',
    component: PrivacyPolicyComponent,
    data: { title: extract('Conquest Advisors - Privacy Policy | Conquest') },
  },
];

@NgModule({
  declarations: [PrivacyPolicyComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class PrivacyPolicyModule {}
