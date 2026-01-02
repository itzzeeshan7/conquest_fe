import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuildingComponent } from './building.component';
import { BuildingRoutingModule } from '@app/pages/building/building-routing.module';
import { SharedModule } from '@shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BuildingHistoryComponent } from './building-history/building-history.component';
import { UtilService } from '../../@shared/util/util.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [BuildingComponent, BuildingHistoryComponent],
  imports: [CommonModule, FormsModule, BuildingRoutingModule, SharedModule, NgbModule],
  providers: [UtilService],
})
export class BuildingModule {}
