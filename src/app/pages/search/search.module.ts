import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { SearchRoutingModule } from '@app/pages/search/search-routing.module';
import { SharedModule } from '@shared/shared.module';
import { NgbModule, NgbCollapseModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchFiltresComponent } from './search-filtres/search-filtres.component';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [SearchComponent, SearchFiltresComponent],
  imports: [
    CommonModule,
    SearchRoutingModule,
    SharedModule,
    NgbModule,
    NgbDropdownModule,
    NgbCollapseModule,
    FormsModule,
    NgSelectModule,
    ScrollingModule,
  ],
})
export class SearchModule {}
