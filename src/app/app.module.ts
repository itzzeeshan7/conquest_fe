import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Angulartics2Module } from 'angulartics2';
import { Router } from '@angular/router';
import * as Sentry from '@sentry/angular';

import { CoreModule } from '@core';
import { SharedModule } from '@shared';
import { AuthModule } from '@app/pages/auth';
import { HomeModule } from './pages/home/home.module';
import { ShellModule } from './shell/shell.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SearchModule } from '@app/pages/search/search.module';
import { GoogleMapsModule } from '@angular/google-maps';
import { BuildingModule } from '@app/pages/building/building.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { JwtModule } from '@auth0/angular-jwt';
import { ApartmentModule } from '@app/pages/apartment/apartment.module';
import { UserModule } from './pages/user/user.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterModule } from './pages/register/register.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';

export function jwtTokenGetter() {
  return 'Bearer ' + localStorage.getItem('token') || sessionStorage.getItem('token');
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    GoogleMapsModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    NgbModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot(),
    JwtModule.forRoot({
      config: {
        headerName: 'authorization',
        authScheme: '',
        tokenGetter: jwtTokenGetter,
      },
    }),
    CoreModule,
    SharedModule,
    ShellModule,
    HomeModule,
    AuthModule,
    RegisterModule,
    SearchModule,
    BuildingModule,
    ApartmentModule,
    UserModule,
    Angulartics2Module.forRoot(),
    AppRoutingModule, // must be imported as the last module as it contains the fallback route
    ScrollingModule,
  ],
  declarations: [AppComponent, LandingPageComponent],
  providers: [
    {
      provide: ErrorHandler,
      useValue: Sentry.createErrorHandler({
        showDialog: false,
      }),
    },
    {
      provide: Sentry.TraceService,
      deps: [Router],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: () => () => {},
      deps: [Sentry.TraceService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
