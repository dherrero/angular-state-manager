import { Injectable } from '@angular/core';
import { UserRequest } from '@interfaces/user.request';
import { User } from '@models/user.state';
import { select } from '@ngneat/elf';
import { UsersService } from '@services/users.service';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { userElfStore } from './user-elf.store';

/**
 * UserStoreElfService
 */
@Injectable({
  providedIn: 'root'
})
export class UserStoreElfService {
  /**
   * Class constructor
   */
  constructor(private users: UsersService) {
    this.$fetchUsers();
  }

  // GETTERS
  isLoading(): Observable<boolean> {
    return userElfStore.pipe(select((state) => state.loading));
  }

  getUsers(): Observable<User[]> {
    return userElfStore.pipe(select((state) => state.users));
  }

  // ACTIONS
  addUser(user: User): void {
    userElfStore.update((state) => ({
      loading: false,
      users: [...state.users, user]
    }));
  }

  updateUser(user: User): void {
    userElfStore.update((state) => {
      const users = state.users.map((u) => (u.userId === user.userId ? { ...user } : u));
      return { loading: false, users: [...users] };
    });
  }

  removeUser(user: User): void {
    userElfStore.update((state) => {
      const users = state.users.filter((u) => u.userId !== user.userId);
      return { loading: false, users: [...users] };
    });
  }

  // PRIVATE METHODS
  private $fetchUsers() {
    this.users
      .get()
      .pipe(
        tap((results: UserRequest) => {
          userElfStore.update(() => ({ loading: false, users: results.users }));
        }),
        take(1)
      )
      .subscribe();
  }
}
