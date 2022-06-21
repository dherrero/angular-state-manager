import { User } from '@models/user.state';
import { createAction, props } from '@ngrx/store';

export const addUser = createAction('[UserState] Add User', props<{ user: User }>());

export const updateUser = createAction('[UserState] Update User', props<{ user: User }>());

export const removeUser = createAction('[UserState] Remove User', props<{ user: User }>());

export const loadUsers = createAction('[UserState] Load Users', props<{ users: User[] }>());
