import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/i18n';
import { SearchComponent } from '@app/pages/search/search.component';
import { Shell } from '@app/shell/shell.service';

const routes: Routes = [{ path: '', component: SearchComponent, data: { title: extract('Search | Conquest') } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class SearchRoutingModule {}
