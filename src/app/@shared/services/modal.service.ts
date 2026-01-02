import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../../pages/auth/components/login/login.component';
import { LogoutComponent } from '../../pages/auth/components/logout/logout.component';
import { RegisterComponent } from '../../pages/register/components/register/register.component';
import { LinkEnum } from '../header-nav/enums/link.enum';

@Injectable({
  providedIn: 'any',
})
export class MyModalService {
  private modalRef: NgbModalRef;
  constructor(private modalService: NgbModal) {}

  openModalFunction(links: LinkEnum) {
    switch (links) {
      case LinkEnum.Login:
        // do any execution before opening child component
        this.modalRef = this.modalService.open(LoginComponent, { backdrop: 'static', keyboard: false });

        break;
      case LinkEnum.Logout:
        // do any execution before opening child component
        this.modalRef = this.modalService.open(LogoutComponent, { backdrop: 'static', keyboard: false });
        break;
      case LinkEnum.Register:
        this.modalRef = this.modalService.open(RegisterComponent, { backdrop: 'static', keyboard: false });
      // do nothing
    }
  }
  hideModalFunction() {
    //do something before closing the modal
    this.modalRef.close();
  }

  dismissAll() {
    this.modalService.dismissAll();
  }
}
