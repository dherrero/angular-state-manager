import { Injectable } from '@angular/core';
import { User } from '@models/user.state';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UserStoreNgxsSate } from './user-ngxs.state';
import { AddUser, UpdateUser, DeleteUser, LoadUsers } from './user-ngxs.actions';

@Injectable()
export class UserStoreNgxsService {
  constructor(private store: Store) {
    this.$fetchUsers();
  }

  // GETTERS
  @Select(UserStoreNgxsSate.isLoading)
  public isLoading!: Observable<boolean>;

  @Select(UserStoreNgxsSate.getUsers)
  public getUsers!: Observable<User[]>;

  // ACTIONS
  addUser(user: User): void {
    this.store.dispatch(new AddUser(user));
  }

  updateUser(user: User): void {
    this.store.dispatch(new UpdateUser(user));
  }

  removeUser(user: User): void {
    this.store.dispatch(new DeleteUser(user));
  }

  // PRIVATE METHODS
  private $fetchUsers() {
    this.store.dispatch(new LoadUsers());
  }
}
