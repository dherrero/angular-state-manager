import { UserState } from '@models/user.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { userFeatureKey } from './user.reducers';

export const getUserState = createFeatureSelector<UserState>(userFeatureKey);

export const isLoading = createSelector(getUserState, (state: UserState) => state.loading);

export const getUsers = createSelector(getUserState, (state: UserState) => state.users);
