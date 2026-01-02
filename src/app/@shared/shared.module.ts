import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderNavComponent } from './header-nav/header-nav.component';
import { HeaderLogoComponent } from './header-logo/header-logo.component';
import { RouterModule } from '@angular/router';
import { IconComponent } from './icon/icon.component';
import { NewsItemComponent } from './news-item/news-item.component';
import { FooterComponent } from './footer/footer.component';
import { PropertyItemComponent } from './property-item/property-item.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { SliderComponent } from './slider/slider.component';
import { FactsComponent } from './facts/facts.component';
import { AgentContactComponent } from './agent-contact/agent-contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AmenitiesComponent } from './amenities/amenities.component';
import { MapsComponent } from './maps/maps.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ScheduleViewingComponent } from './schedule-viewing/schedule-viewing.component';
import { BuildingCardComponent } from './building-card/building-card.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { TranslateModule } from '@ngx-translate/core';
import { ApartmentCardComponent } from './apartament-card/apartament-card.component';
import { ApartmentsComponent } from './apartments/apartments.component';
import { ListingHistoryComponent } from './listing-history/listing-history.component';
import { AutocompleteFilterPipe } from './pipes/autocomplete-filter.pipe';
import { ListingService } from './services/listing.service';
import { MyModalService } from './services/modal.service';
import { MultiDropdownComponent } from './directives/multi-dropdown/multi-dropdown.component';
import { SearchFilterPipe } from './pipes/search.pipe';
import { ErrorImageDirective } from './directives/error-image/error-image.directive';
import { ImagePreviewComponent } from './image-preview/image-preview.component';
import { LoginComponent } from '../pages/auth/components/login/login.component';
import { LogoutComponent } from '../pages/auth/components/logout/logout.component';
import { RegisterComponent } from '../pages/register/components/register/register.component';
import { WhatsAppContainerComponent } from './whatsapp-container/whatsapp-container.component';
import { ShareButtonDirective } from 'ngx-sharebuttons';

const COMPONENTS = [
  HeaderNavComponent,
  HeaderLogoComponent,
  IconComponent,
  NewsItemComponent,
  FooterComponent,
  PropertyItemComponent,
  BreadcrumbsComponent,
  FactsComponent,
  AgentContactComponent,
  SliderComponent,
  AmenitiesComponent,
  MapsComponent,
  ScheduleViewingComponent,
  BuildingCardComponent,
  AutocompleteFilterPipe,
  SearchFilterPipe,
  WhatsAppContainerComponent,
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    GoogleMapsModule,
    ReactiveFormsModule,
    TranslateModule,
    NgbModule,
    ShareButtonDirective,
  ],
  declarations: [
    ...COMPONENTS,
    AutocompleteComponent,
    ErrorMessageComponent,
    ApartmentCardComponent,
    ApartmentsComponent,
    ListingHistoryComponent,
    MultiDropdownComponent,
    ErrorImageDirective,
    ImagePreviewComponent,
  ],
  exports: [
    ...COMPONENTS,
    AutocompleteComponent,
    ErrorMessageComponent,
    ApartmentCardComponent,
    ApartmentsComponent,
    ListingHistoryComponent,
    MultiDropdownComponent,
    ErrorImageDirective,
    GoogleMapsModule,
    NgbModule,
    ShareButtonDirective,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [ListingService, MyModalService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
