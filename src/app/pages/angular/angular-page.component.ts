import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { User } from '@models/user.state';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserStoreService } from '@services/angular/user-store.service';
import { deepClone } from 'app/utils/utils';
import { Observable } from 'rxjs';

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
    try {
      user.friends.push({ id: `random-friend-${Math.random()}` }); //it will fail
    } catch (e) {
      console.error(e);
      const userUpdate = deepClone(user);
      userUpdate.friends.push({ id: `random-friend-${Math.random()}` });
      this.userStore.updateUser(userUpdate);
    }
  }

  removeFriend(e: Event, user: User) {
    e.stopPropagation();
    const userUpdate = deepClone(user);
    userUpdate.friends.pop();
    this.userStore.updateUser(userUpdate);
  }

  removeUser(e: Event, user: User) {
    e.stopPropagation();
    this.userStore.removeUser(user);
  }
}
