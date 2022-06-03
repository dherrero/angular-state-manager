import { Injectable } from '@angular/core';
import { UserState, defaultUserState, User } from '@models/user.state';
import { Actions, userReducer } from './reducers';
import { StoreService } from 'app/classes/store-service';
import { UsersService } from '@services/users.service';
import { take, tap } from 'rxjs';
import { UserRequest } from '@interfaces/user.request';

/**
 * UserStoreService
 */
@Injectable({
  providedIn: 'root',
})
export class UserStoreService extends StoreService<UserState> {
  users$ = this.select<User[]>('users');
  loading$ = this.select<boolean>('loading');

  constructor(private users: UsersService) {
    super('userState', defaultUserState, userReducer, false, true);
  }

  loadUserEffect() {
    this.users
      .get()
      .pipe(
        tap((results: UserRequest) => {
          this.dispatch<User[]>(Actions.SET_USERS, results.users);
        }),
        take(1)
      )
      .subscribe();
  }
}
