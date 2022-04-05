export interface UserState {
  loading: boolean;
  users: User[];
}
export interface User {
  userId: string;
  firstname: string;
  lastname: string;
  friends: Friend[];
}

interface Friend {
  id: string;
}

export const defaultUserState: UserState = { loading: true, users: [] };
