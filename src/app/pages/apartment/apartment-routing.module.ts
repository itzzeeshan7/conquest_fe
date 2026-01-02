import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/i18n';
import { Shell } from '@app/shell/shell.service';
import { ApartmentComponent } from '@app/pages/apartment/apartment.component';

const routes: Routes = [
  Shell.childRoutes([{ path: 'apartment', component: ApartmentComponent, data: { title: extract('') } }]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class ApartmentRoutingModule {}
