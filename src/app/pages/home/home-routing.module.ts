import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { extract } from '@app/i18n';
import { HomeComponent } from './home.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, data: { title: extract('Home | Conquest') } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class HomeRoutingModule {}
