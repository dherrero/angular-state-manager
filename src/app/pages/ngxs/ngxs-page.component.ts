import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { User } from '@models/user.state';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserStoreNgxsService } from '@services/ngxs/user-store-ngxs.service';
import { Observable } from 'rxjs';

/**
 * NgxsPage.Component
 */
@Component({
  selector: 'app-ngxs',
  templateUrl: './ngxs-page.component.html',
  styleUrls: ['./ngxs-page.component.scss'],
})
export class NgxsPageComponent implements OnInit {
  loading$!: Observable<boolean>;
  users$!: Observable<User[]>;
  userSelected!: User;

  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<unknown>;

  /**
   * Class constructor
   */
  constructor(
    private userStore: UserStoreNgxsService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.loading$ = this.userStore.isLoading;
    this.users$ = this.userStore.getUsers;
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
    // Al igual que Ngrx, NGXS también protege el estado y bloque la invocación de
    // user.friends.push({ id: `random-friend-${Math.random()}` });
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
