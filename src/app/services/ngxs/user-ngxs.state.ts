import { Injectable } from '@angular/core';
import { defaultUserState, User, UserState } from '@models/user.state';
import { UsersService } from '@services/users.service';
import { take, tap } from 'rxjs/operators';
import { Action, State, StateContext, Selector } from '@ngxs/store';
import { AddUser, UpdateUser, DeleteUser, LoadUsers } from './user-ngxs.actions';
import { UserRequest } from '@interfaces/user.request';

@State<UserState>({
  name: 'UserStateNgxs',
  defaults: defaultUserState
})
@Injectable()
export class UserStoreNgxsSate {
  /**
   * Class constructor
   */
  constructor(private readonly users: UsersService) {}

  @Selector()
  static isLoading(state: UserState): boolean {
    return state.loading;
  }

  @Selector()
  static getUsers(state: UserState): User[] {
    return state.users;
  }

  @Action(AddUser)
  addUser({ getState, setState }: StateContext<UserState>, { user }: AddUser): void {
    const state = getState();
    setState({ loading: false, users: [...state.users, user] });
  }

  @Action(UpdateUser)
  updateUser({ getState, setState }: StateContext<UserState>, { user }: AddUser): void {
    const state = getState();
    const users = state.users.map((u) => (u.userId === user.userId ? { ...user } : u));
    setState({ loading: false, users: [...users] });
  }

  @Action(DeleteUser)
  removeUser({ getState, setState }: StateContext<UserState>, { user }: DeleteUser): void {
    const state = getState();
    const users = state.users.filter((u) => u.userId !== user.userId);
    setState({ loading: false, users: [...users] });
  }

  @Action(LoadUsers)
  loadUsers({ patchState }: StateContext<UserState>) {
    this.users
      .get()
      .pipe(
        tap((results: UserRequest) => {
          patchState({ loading: false, users: results.users });
        }),
        take(1)
      )
      .subscribe();
  }
}
