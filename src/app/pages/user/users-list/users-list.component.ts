import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User, UserRoles } from '../../register/models/user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  standalone: false,
})
export class UsersListComponent implements OnInit {
  users: User[];
  userCopy: User[];
  search: string;
  roles: UserRoles[];
  showPasswordField: boolean = false;

  constructor(private readonly userService: UserService) {}

  ngOnInit(): void {
    this.combineUsersAndRoles();
  }

  getRoles(roles: UserRoles[]): string {
    return roles
      .filter((userRole) => userRole.checked)
      .map((role) => role.name)
      .toString();
  }

  getAllRoles$(): Observable<UserRoles[]> {
    return this.userService.getRoles();
  }

  combineUsersAndRoles() {
    combineLatest([this.getAllUsers$(), this.getAllRoles$()]).subscribe((res) => {
      this.users = res[0];
      this.roles = res[1];
      this.showPasswordField = false;

      this.users.forEach((user: User) => {
        user.roles.forEach((role: UserRoles) => {
          role.checked = true;
        });
        const ids = new Set(user.roles.map((r) => r.id));
        const merged = [...user.roles, ...this.roles.filter((r) => !ids.has(r.id))];
        user.roles = merged;
      });
      this.userCopy = JSON.parse(JSON.stringify(this.users));
    });
  }

  getAllUsers$(): Observable<User[]> {
    return this.userService.getAllUsers();
  }

  onItemChange(ev: UserRoles): void {}

  toggleEdit(user: User): void {
    if (this.showPasswordField) {
      this.showPasswordField = false;
    }
    if (user.edit) {
      this.users = JSON.parse(JSON.stringify(this.userCopy));
    }
    user.edit = !user.edit;
  }

  saveUser(user: User) {
    user.roles = user.roles.filter((role) => role.checked);
    if (!user.newUser) {
      this.userService.updateUserByAdmin(user).subscribe(() => {
        this.combineUsersAndRoles();
      });
    } else {
      this.userService.createUserByAdmin(user).subscribe(() => {
        this.combineUsersAndRoles();
      });
    }
  }

  addNewUser() {
    let user = new User('', '', true);
    user.roles = [...this.roles];
    user.edit = true;
    user.newUser = true;
    this.showPasswordField = true;
    this.users.unshift(user);
  }

  delteUser(user: User) {
    this.userService.deleteUserByAdmin(user).subscribe(() => {
      this.combineUsersAndRoles();
    });
  }
}
