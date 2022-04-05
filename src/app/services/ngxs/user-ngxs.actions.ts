import { User } from '@models/user.state';

export class AddUser {
  static type = '[NGXS users] Add user';
  constructor(public user: User) {}
}

export class UpdateUser {
  static type = '[NGXS users] Update user';
  constructor(public user: User) {}
}

export class DeleteUser {
  static type = '[NGXS users] Delete user';
  constructor(public user: User) {}
}

export class LoadUsers {
  static type = '[NGXS users] Load users';
  constructor() {}
}
