import { Friend, User, UserState } from "@models/user.state";
import { createAdapter } from "@state-adapt/core";

const baseAdapter = createAdapter<UserState>()({
  updateUser: (state, user: User) => {
    const users = state.users.map((u) => (u.userId === user.userId ? { ...user } : u));
    return { loading: false, users: [...users] };
  },
})

export const userAdpater = createAdapter<UserState>()({
  ...baseAdapter,
  loadUsers: (state, users: User[]) => ({...state, users, loading: false}),
  addUser: (state, user: User) => ({ loading: false, users: [...state.users, user] }),
  addFriend: (state, { user, friend }: { user: User, friend: Friend }) =>
    baseAdapter.updateUser(state, {...user, friends: [...user.friends, friend ]}),
  removeFriend: (state, user: User) =>
    baseAdapter.updateUser(state, {...user, friends: user.friends.slice(0, -1)}),
  removeUser: (state, user: User) => {
    const users = state.users.filter((u) => u.userId !== user.userId);
    return { loading: false, users: [...users] };
  },
  selectors: {
    users: s => s.users,
    loading: s => s.loading,
  }
})
