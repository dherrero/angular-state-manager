import { Component } from '@angular/core';
import { User } from '@models/user.state';
import { UserStore } from '@services/state-adapt/user.store';

@Component({
  selector: 'app-user-list-state-adapt',
  templateUrl: './user-list-state-adapt.component.html',
  styleUrls: ['./user-list-state-adapt.component.scss'],
})
export class UserListStateAdaptComponent {
  users$ = this.userStore.users$;
  /**
   * Class constructor
   */
  constructor(private userStore: UserStore) {}

  userId(_: number, user: User) {
    return user.userId;
  }
}
