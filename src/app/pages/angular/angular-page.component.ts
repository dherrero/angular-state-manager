import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { UserRequest } from '@interfaces/user.request';
import { User } from '@models/user.state';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Actions } from '@services/angular/reducers';
import { UserStoreService } from '@services/angular/user-store.service';
import { UsersService } from '@services/users.service';
import { deepClone } from 'app/utils/utils';
import { Observable, take, tap } from 'rxjs';

/**
 * AngularPage.Component
 */
@Component({
  selector: 'app-angular',
  templateUrl: './angular-page.component.html',
  styleUrls: ['./angular-page.component.scss'],
})
export class AngularPageComponent implements OnInit {
  loading$!: Observable<boolean>;
  users$!: Observable<User[]>;

  userSelected!: User;

  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<unknown>;

  constructor(
    private userStore: UserStoreService,
    private modalService: NgbModal,
    private users: UsersService
  ) {}

  ngOnInit(): void {
    this.loading$ = this.userStore.select$<boolean>('loading');
    this.users$ = this.userStore.select$<User[]>('users');
    if (this.userStore.get<boolean>('loading'))
      this.users
        .get()
        .pipe(
          tap((results: UserRequest) => {
            this.userStore.dispatch(Actions.SET_USERS, results.users);
          }),
          take(1)
        )
        .subscribe();
  }

  userId(_: number, user: User) {
    return user.userId;
  }

  renameUser(user: User) {
    this.userSelected = { ...user, friends: [...user.friends] };
    this.modalService.open(this.dialogTemplate).result.finally(() => {
      this.userStore.dispatch(Actions.UPDATE_USER, {
        ...this.userSelected,
        friends: [...this.userSelected.friends],
      });
    });
  }

  addFriend(e: Event, user: User) {
    e.stopPropagation();
    this.userStore.dispatch(Actions.ADD_FRIEND, user);
  }

  removeFriend(e: Event, user: User) {
    e.stopPropagation();
    this.userStore.dispatch(Actions.REMOVE_FRIEND, user);
  }

  removeUser(e: Event, user: User) {
    e.stopPropagation();
    this.userStore.dispatch(Actions.REMOVE_USER, user);
  }
}
