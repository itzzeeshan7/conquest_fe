import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nModule } from '@app/i18n';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RegisterComponent } from './components/register/register.component';
import { RegisterRoutingModule } from '@app/pages/register/register-routing.module';
import { SharedModule } from '@shared';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RegisterEffects } from '@app/pages/register/actions/effects/register.effects';
import { reducers } from '@app/pages/register/actions/reducer/index';
import { ActivatedEmailComponent } from './components/activated-email/activated-email.component';
import { ReqResetComponent } from './components/req-reset/req-reset.component';
import { ResetComponent } from './components/reset/reset.component';

@NgModule({
  declarations: [RegisterComponent, ActivatedEmailComponent, ReqResetComponent, ResetComponent],
  imports: [
    CommonModule,
    I18nModule,
    NgbModule,
    ReactiveFormsModule,
    TranslateModule,
    RegisterRoutingModule,
    SharedModule,
    StoreModule.forFeature('register', reducers),
    EffectsModule.forFeature([RegisterEffects]),
  ],
})
export class RegisterModule {}
