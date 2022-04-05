import { defaultUserState, UserState } from '@models/user.state';
import { createStore, withProps } from '@ngneat/elf';

export const userElfStore = createStore({ name: 'UserElfStore' }, withProps<UserState>(defaultUserState));
