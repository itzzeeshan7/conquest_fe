import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../@shared';
import { extract } from '@app/i18n';
import { LeadershiComponent } from './leadership.component';

const routes: Routes = [{ path: '', component: LeadershiComponent, data: { title: extract('News | Conquest') } }];

@NgModule({
  declarations: [LeadershiComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    TranslateModule,
    RouterModule.forChild(routes),
  ],
})
export class LeadershipModule {}
