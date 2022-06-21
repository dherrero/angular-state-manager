import { Component, TemplateRef, ViewChild } from '@angular/core';
import { User } from '@models/user.state';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserStore } from '@services/state-adapt/user.store';

/**
 * StateAdaptPage.Component
 */
@Component({
  selector: 'app-state-adapt',
  templateUrl: './state-adapt-page.component.html',
  styleUrls: ['./state-adapt-page.component.scss'],
})
export class StateAdaptPageComponent {
  friendAdded$ = this.userStore.friendAdded$;
  friendRemoved$ = this.userStore.friendRemoved$;
  userRemoved$ = this.userStore.userRemoved$;

  loading$ = this.userStore.loading$;
  users$ = this.userStore.users$;
  userSelected!: User;

  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<unknown>;

  /**
   * Class constructor
   */
  constructor(
    private userStore: UserStore,
    private modalService: NgbModal
  ) {}

  userId(_: number, user: User) {
    return user.userId;
  }

  renameUser(user: User) {
    this.userSelected = { ...user };
    this.modalService.open(this.dialogTemplate).result.finally(() => {
      this.userStore.userUpdate$.next({
        ...this.userSelected,
        friends: [...this.userSelected.friends],
      });
    });
  }
}
