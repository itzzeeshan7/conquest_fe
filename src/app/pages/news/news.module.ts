import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsComponent } from './news.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../@shared';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule, Routes } from '@angular/router';
import { extract } from '@app/i18n';

const routes: Routes = [{ path: '', component: NewsComponent, data: { title: extract('News | Conquest') } }];

@NgModule({
  declarations: [NewsComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    TranslateModule,
    RouterModule.forChild(routes),
  ],
})
export class NewsModule {}
