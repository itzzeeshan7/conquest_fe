import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApartmentComponent } from './apartment.component';
import { ApartmentRoutingModule } from '@app/pages/apartment/apartment-routing.module';
import { SharedModule } from '@shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ApartmentComponent],
  imports: [CommonModule, FormsModule, ApartmentRoutingModule, SharedModule, NgbModule],
})
export class ApartmentModule {}
