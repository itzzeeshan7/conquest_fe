import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/i18n';
import { LoginComponent } from './components/login/login.component';
import { AuthenticationGuard } from '@app/pages/auth/guards/authentication.guard';
import { LogoutComponent } from './components/logout/logout.component';

const routes: Routes = [
  // { path: 'login', component: LoginComponent, data: { title: extract('Login') } },
  // { path: 'logout', component: LogoutComponent, data: { title: extract('Logout') } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AuthRoutingModule {}
