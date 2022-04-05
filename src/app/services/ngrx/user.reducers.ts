import { defaultUserState } from '@models/user.state';
import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';

export const userFeatureKey = 'userModel';

export const userReducer = createReducer(
  defaultUserState,
  on(UserActions.addUser, (state, { user }) => ({ loading: false, users: [...state.users, user] })),
  on(UserActions.updateUser, (state, { user }) => {
    const users = state.users.map((u) => (u.userId === user.userId ? { ...user } : u));
    return { loading: false, users: [...users] };
  }),
  on(UserActions.removeUser, (state, { user }) => {
    const users = state.users.filter((u) => u.userId !== user.userId);
    return { loading: false, users: [...users] };
  }),
  on(UserActions.loadUsers, (_, { users }) => ({ loading: false, users }))
);
