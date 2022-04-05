import { User } from '@models/user.state';

export interface UserRequest {
  users: User[];
  total: string;
}
