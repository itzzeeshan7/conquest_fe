import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { extract } from '@app/i18n';
import { RegisterComponent } from '@app/pages/register/components/register/register.component';
import { ActivatedEmailComponent } from '@app/pages/register/components/activated-email/activated-email.component';
import { ReqResetComponent } from '@app/pages/register/components/req-reset/req-reset.component';
import { ResetComponent } from '@app/pages/register/components/reset/reset.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent, data: { title: extract('Register | Conquest') } },
  {
    path: 'activation/email',
    component: ActivatedEmailComponent,
    data: { title: extract('Activated Email | Conquest') },
  },
  { path: 'req-reset', component: ReqResetComponent, data: { title: extract('Request Reset | Conquest') } },
  { path: 'reset-password', component: ResetComponent, data: { title: extract('Reset Password | Conquest') } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class RegisterRoutingModule {}
