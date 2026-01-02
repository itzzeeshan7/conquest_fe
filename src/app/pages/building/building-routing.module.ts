import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/i18n';
import { Shell } from '@app/shell/shell.service';
import { BuildingComponent } from '@app/pages/building/building.component';

const routes: Routes = [
  Shell.childRoutes([{ path: 'building', component: BuildingComponent, data: { title: extract('') } }]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class BuildingRoutingModule {}
