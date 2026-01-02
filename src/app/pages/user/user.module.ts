import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { SavedListingComponent } from './saved-listing/saved-listing.component';
import { RouterModule, Routes } from '@angular/router';
import { Shell } from '../../shell/shell.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../@shared';
import { TranslateModule } from '@ngx-translate/core';
import { AuthenticationGuard } from '../auth';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserService } from './user.service';
import { UsersListComponent } from './users-list/users-list.component';
import { RoleGuard } from '../auth/guards/role.guard';
import { ExternalApisComponent } from './external-apis/external-apis.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'user',
      component: UserComponent,
      canActivate: [AuthenticationGuard],
      canActivateChild: [AuthenticationGuard],
      children: [
        { path: 'details', component: UserDetailsComponent },
        {
          path: 'saved-data',
          component: SavedListingComponent,
        },
        {
          path: 'users-list',
          component: UsersListComponent,
          canActivate: [RoleGuard],
        },
        {
          path: 'external-apis',
          component: ExternalApisComponent,
          canActivate: [RoleGuard],
        },
        {
          path: '**',
          redirectTo: 'saved-data',
          pathMatch: 'full',
        },
      ],
    },
  ]),
];

@NgModule({
  declarations: [UserComponent, UserDetailsComponent, SavedListingComponent, UsersListComponent, ExternalApisComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    TranslateModule,
    NgbDropdownModule,
    RouterModule.forChild(routes),
  ],
  providers: [UserService],
})
export class UserModule {}
