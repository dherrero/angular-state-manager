import { Injectable } from '@angular/core';
import { UserRequest } from '@interfaces/user.request';
import { UserState, User } from '@models/user.state';
import { Store } from '@ngrx/store';
import { UsersService } from '@services/users.service';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import * as UserActions from './user.actions';
import * as UserSelectors from './user.selectors';

/**
 * UserStoreNgrxService
 */
@Injectable({
  providedIn: 'root'
})
export class UserStoreNgrxService {
  /**
   * Class constructor
   */
  constructor(private store: Store<UserState>, private users: UsersService) {
    this.$fetchUsers();
  }

  // GETTERS
  isLoading(): Observable<boolean> {
    return this.store.select(UserSelectors.isLoading);
  }

  getUsers(): Observable<User[]> {
    return this.store.select(UserSelectors.getUsers);
  }

  // ACTIONS
  addUser(user: User): void {
    this.store.dispatch(UserActions.addUser({ user }));
  }

  updateUser(user: User): void {
    this.store.dispatch(UserActions.updateUser({ user }));
  }

  removeUser(user: User): void {
    this.store.dispatch(UserActions.removeUser({ user }));
  }

  // PRIVATE METHODS
  private $fetchUsers() {
    this.users
      .get()
      .pipe(
        tap((results: UserRequest) => {
          this.store.dispatch(UserActions.loadUsers({ users: results.users }));
        }),
        take(1)
      )
      .subscribe();
  }
}
