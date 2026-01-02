import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { Shell } from '@app/shell/shell.service';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: 'search', loadChildren: () => import('./pages/search/search.module').then((m) => m.SearchModule) },
    { path: 'about', loadChildren: () => import('./pages/about/about.module').then((m) => m.AboutModule) },
    // {
    //   path: 'leadership',
    //   loadChildren: () => import('./pages/leadership/leadership.module').then((m) => m.LeadershipModule),
    // },
    {
      path: 'contact',
      loadChildren: () => import('./pages/contact/contact.module').then((m) => m.ContactModule),
    },
    {
      path: 'news',
      loadChildren: () => import('./pages/news/news.module').then((m) => m.NewsModule),
    },
    {
      path: 'residental',
      loadChildren: () => import('./pages/residental/residental.module').then((m) => m.ResidentalModule),
    },
    {
      path: 'commercial',
      loadChildren: () => import('./pages/commercial/commercial.module').then((m) => m.CommercialModule),
    },
    {
      path: 'private-equity',
      loadChildren: () => import('./pages/private-equity/private-equity.module').then((m) => m.PrivateEquityModule),
    },
    {
      path: 'terms-of-service',
      loadChildren: () =>
        import('./pages/terms-of-service/terms-of-service.module').then((m) => m.TermsOfServiceModule),
    },
    {
      path: 'privacy-policy',
      loadChildren: () => import('./pages/privacy-policy/privacy-policy.module').then((m) => m.PrivacyPolicyModule),
    },
  ]),
  {
    path: 'landing-page',
    component: LandingPageComponent,
  },
  // Fallback when no prior route is matched
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
