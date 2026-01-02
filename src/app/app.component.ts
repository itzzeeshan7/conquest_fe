import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { merge } from 'rxjs';
import { delay, filter, map, switchMap } from 'rxjs/operators';
import { State } from '@app/pages/auth/actions/reducer/auth.reducers';
import * as fromAuth from '@app/pages/auth/actions/reducer/index';
import { environment } from '@env/environment';
import { Logger, untilDestroyed } from '@core';
import { I18nService } from '@app/i18n';
import { Store } from '@ngrx/store';
import { LoadUserAction } from './pages/auth/actions/auth.action';
import { LoadingService } from './@core/http/loading/loading.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './pages/register/components/register/register.component';

const log = new Logger('App');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit, OnDestroy {
  public loading: boolean = false;
  private totalClicks: number = 0;
  private isAuthenticate: boolean = false;

  constructor(
    private readonly router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private translateService: TranslateService,
    private i18nService: I18nService,
    private store: Store<State>,
    private _loading: LoadingService,
    private myModalService: NgbModal,
  ) {
    this.store.dispatch(new LoadUserAction());
  }

  ngOnInit() {
    // Setup logger
    if (environment.production) {
      Logger.enableProductionMode();
    }

    this.store.select(fromAuth.getLoggedIn).subscribe((isAuth: boolean) => {
      this.isAuthenticate = isAuth;
    });

    this.router.events.subscribe((val) => {
      if (!this.isAuthenticate) {
        if (val instanceof NavigationEnd) {
          this.totalClicks++;
          if (this.totalClicks > 5) {
            this.totalClicks = 0;
            this.myModalService.open(RegisterComponent);
          }
        }
      }
    });

    log.debug('init');

    // this.angulartics2GoogleAnalytics.startTracking();
    // this.angulartics2GoogleAnalytics.eventTrack(environment.version, { category: 'App initialized' });

    // Setup translations
    this.i18nService.init(environment.defaultLanguage, environment.supportedLanguages);

    const onNavigationEnd = this.router.events.pipe(filter((event) => event instanceof NavigationEnd));

    this.listenToLoading();

    // Change page title on navigation or language change, based on route data
    merge(this.translateService.onLangChange, onNavigationEnd)
      .pipe(
        map(() => {
          let route = this.activatedRoute;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter((route) => route.outlet === 'primary'),
        switchMap((route) => route.data),
        untilDestroyed(this),
      )
      .subscribe((event) => {
        const title = event.title;
        if (title) {
          this.titleService.setTitle(this.translateService.instant(title));
        }
      });
  }

  /**
   * Listen to the loadingSub property in the LoadingService class. This drives the
   * display of the loading spinner.
   */
  listenToLoading(): void {
    this._loading.loadingSub
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((loading) => {
        this.loading = loading;
      });
  }

  ngOnDestroy() {
    this.i18nService.destroy();
  }
}
