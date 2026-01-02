import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ReqResetComponent } from '@app/pages/register/components/req-reset/req-reset.component';
import { Logger } from '../../../../@core/logger.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Store } from '@ngrx/store';
import * as fromAuth from '@app/pages/auth/actions/reducer/index';
import { State } from '@app/pages/auth/actions/reducer/auth.reducers';
import { LogOutAction } from '../../actions/auth.action';
import { ActivatedRoute, Router } from '@angular/router';

const log = new Logger('Logout');

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
  standalone: false,
})
export class LogoutComponent implements OnInit {
  modalOption: NgbModalOptions = {};
  private currentUrl = '';

  constructor(
    private modalService: NgbModal,
    private store: Store<State>,
    private router: Router,
    private route: ActivatedRoute,
    public activeModal: NgbActiveModal,
  ) {
    this.currentUrl = this.router.url;
  }

  ngOnInit(): void {
    // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    // this.router.onSameUrlNavigation = 'reload';
    // this.router.navigate([this.currentUrl]);
    // this.router.navigate(['/apartament'], {
    //   queryParams: { id: item['id'], searchType: this.searchType },
    // });
  }

  openDialog() {
    this.modalOption.backdrop = 'static';
    this.modalOption.keyboard = false;
    this.modalService.dismissAll();
    this.modalService.open(ReqResetComponent, this.modalOption);
  }

  logout() {
    this.store.dispatch(new LogOutAction());
    this.modalService.dismissAll();
  }

  cancel() {
    this.modalService.dismissAll();
  }
}
