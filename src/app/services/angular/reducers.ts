import { User, UserState } from '@models/user.state';

export enum Actions {
  ADD_USER = 'ADD_USER',
  UPDATE_USER = 'UPDATE_USER',
  REMOVE_USER = 'REMOVE_USER',
  SET_USERS = 'SET_USERS',
  ADD_FRIEND = 'ADD_FRIEND',
  REMOVE_FRIEND = 'REMOVE_FRIEND',
}

const addUser = (state: UserState, payload: User): UserState =>
  ({
    loading: false,
    users: [...state.users, payload],
  } as UserState);

const updateUser = (state: UserState, payload: User): UserState => {
  const userUpdate = { ...payload, friends: [...payload.friends] };
  const users = state.users.map((u) =>
    u.userId === payload.userId ? userUpdate : u
  );
  return { loading: false, users: [...users] };
};

const removeUser = (state: UserState, payload: User): UserState => {
  const users = state.users.filter((u) => u.userId !== payload.userId);
  return { loading: false, users: [...users] };
};

const setUsers = (_: UserState, payload: User[]): UserState => ({
  loading: false,
  users: [...payload],
});

const addFriend = (state: UserState, payload: User): UserState => {
  const userUpdate = { ...payload, friends: [...payload.friends] };
  userUpdate.friends.push({ id: `random-friend-${Math.random()}` });
  return userReducer.get(Actions.UPDATE_USER)(state, userUpdate);
};

const removeFriend = (state: UserState, payload: User): UserState => {
  const userUpdate = { ...payload, friends: [...payload.friends] };
  userUpdate.friends.pop();
  return userReducer.get(Actions.UPDATE_USER)(state, userUpdate);
};

export const userReducer = new Map();

userReducer.set(Actions.ADD_USER, addUser);
userReducer.set(Actions.UPDATE_USER, updateUser);
userReducer.set(Actions.REMOVE_USER, removeUser);
userReducer.set(Actions.SET_USERS, setUsers);
userReducer.set(Actions.ADD_FRIEND, addFriend);
userReducer.set(Actions.REMOVE_FRIEND, removeFriend);
