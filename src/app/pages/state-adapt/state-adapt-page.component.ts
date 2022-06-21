import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { User } from '@models/user.state';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserStoreStateAdaptService } from '@services/state-adapt/user-store-state-adapt.service';
import { deepClone } from 'app/utils/utils';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';

/**
 * StateAdaptPage.Component
 */
@Component({
  selector: 'app-state-adapt',
  templateUrl: './state-adapt-page.component.html',
  styleUrls: ['./state-adapt-page.component.scss'],
})
export class StateAdaptPageComponent implements OnInit {
  loading$!: Observable<boolean>;
  users$!: Observable<User[]>;
  userSelected!: User;

  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<unknown>;

  /**
   * Class constructor
   */
  constructor(
    private userStore: UserStoreStateAdaptService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.loading$ = this.userStore.isLoading();
    this.users$ = this.userStore.getUsers();
  }

  userId(_: number, user: User) {
    return user.userId;
  }

  renameUser(user: User) {
    this.userSelected = { ...user, friends: [...user.friends] };
    this.modalService.open(this.dialogTemplate).result.finally(() => {
      this.userStore.updateUser({
        ...this.userSelected,
        friends: [...this.userSelected.friends],
      });
    });
  }

  addFriend(e: Event, user: User) {
    e.stopPropagation();
    const userUpdate = deepClone<User>(user);
    userUpdate.friends.push({ id: `random-friend-${Math.random()}` });
    this.userStore.updateUser(userUpdate);
    // StateAdapt protege el estado
    // con lo que no podemos hacer directamente un user.friends.push({ id: `random-friend-${Math.random()}` });
  }

  removeFriend(e: Event, user: User) {
    e.stopPropagation();
    const userUpdate = deepClone<User>(user);
    userUpdate.friends.pop();
    this.userStore.updateUser(userUpdate);
  }

  removeUser(e: Event, user: User) {
    e.stopPropagation();
    this.userStore.removeUser(user);
  }
}
