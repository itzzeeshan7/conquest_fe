import { Component, HostListener, OnInit } from '@angular/core';
import { LinkEnum } from '@shared/header-nav/enums/link.enum';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '@app/pages/auth/actions/reducer/auth.reducers';
import * as fromAuth from '@app/pages/auth/actions/reducer/index';
import { switchMap } from 'rxjs/operators';
import { MyModalService } from '../services/modal.service';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.scss'],
  standalone: false,
})
export class HeaderNavComponent implements OnInit {
  public showNav: boolean;
  public Links = LinkEnum;
  isAuthenticate$: Observable<boolean>;
  modalOption: NgbModalOptions = {};

  constructor(
    private myModalService: MyModalService,
    private store: Store<State>,
  ) {}

  ngOnInit(): void {
    this.isAuthenticate$ = this.store.select(fromAuth.getLoggedIn).pipe(
      switchMap((isAuth) => {
        return of(isAuth);
      }),
    );
  }

  toggleNav(): void {
    this.showNav = !this.showNav;
  }

  async openDialog(links: LinkEnum) {
    this.myModalService.openModalFunction(links);
  }

  @HostListener('window:resize', ['$event'])
  public clickOut($event: any) {}
}
