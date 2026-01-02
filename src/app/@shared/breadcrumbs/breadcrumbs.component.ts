import { AfterContentChecked, ChangeDetectorRef, Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IBreadcrumbs } from './IBreadcrumbs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
  standalone: false,
})
export class BreadcrumbsComponent implements AfterContentChecked {
  public searchType: string;
  public searchBy: string;
  public isBuildingPage: boolean;
  public _navigation: IBreadcrumbs;

  @Input() set navigation(value: IBreadcrumbs) {
    this._navigation = value;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cdref: ChangeDetectorRef,
  ) {
    this.route.queryParams.subscribe((params) => {
      this.searchBy = params.salesOrRental;
      this.searchType = params.type;
    });
    this.isBuildingPage = this.router.url.includes('/building');
  }

  get navigation(): IBreadcrumbs {
    return this._navigation;
  }

  ngAfterContentChecked(): void {
    this.cdref.detectChanges();
  }
}
