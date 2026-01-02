import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../@shared';
import { TranslateModule } from '@ngx-translate/core';
import { extract } from '@app/i18n';

const routes: Routes = [{ path: '', component: ContactComponent, data: { title: extract('Contact | Conquest') } }];

@NgModule({
  declarations: [ContactComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    TranslateModule,
    RouterModule.forChild(routes),
  ],
})
export class ContactModule {}
