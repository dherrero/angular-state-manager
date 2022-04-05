import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { User } from '@models/user.state';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserStoreNgrxService } from '@services/ngrx/user-store-ngrx.service';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';

/**
 * NgrxPage.Component
 */
@Component({
  selector: 'app-ngrx',
  templateUrl: './ngrx-page.component.html',
  styleUrls: ['./ngrx-page.component.scss'],
})
export class NgrxPageComponent implements OnInit {
  loading$!: Observable<boolean>;
  users$!: Observable<User[]>;
  userSelected!: User;

  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<unknown>;

  /**
   * Class constructor
   */
  constructor(
    private userStore: UserStoreNgrxService,
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
    const userUpdate = this.copyUser(user);
    userUpdate.friends.push({ id: `random-friend-${Math.random()}` });
    this.userStore.updateUser(userUpdate);
    // Ngrx protege el estado
    // con lo que no podemos hacer directamente un user.friends.push({ id: `random-friend-${Math.random()}` });
  }

  removeFriend(e: Event, user: User) {
    e.stopPropagation();
    const userUpdate = this.copyUser(user);
    userUpdate.friends.pop();
    this.userStore.updateUser(userUpdate);
  }

  removeUser(e: Event, user: User) {
    e.stopPropagation();
    this.userStore.removeUser(user);
  }

  private copyUser(user: User): User {
    return { ...user, friends: [...user.friends] };
  }
}
