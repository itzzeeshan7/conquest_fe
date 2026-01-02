import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { I18nModule } from '@app/i18n';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from '@app/pages/auth/actions/reducer/index';
import { AuthEffects } from '@app/pages/auth/actions/effects/auth.effects';
import { SharedModule } from '@shared';
import { LogoutComponent } from './components/logout/logout.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    NgbModule,
    I18nModule,
    // AuthRoutingModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([AuthEffects]),
    SharedModule,
  ],
  declarations: [LoginComponent, LogoutComponent],
})
export class AuthModule {}
