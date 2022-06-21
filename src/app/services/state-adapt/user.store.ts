import { Injectable } from '@angular/core';
import { defaultUserState, User } from '@models/user.state';
import { UsersService } from '@services/users.service';
import { AdaptCommon, Source, toSource } from '@state-adapt/core';
import { map, Subject } from 'rxjs';
import { userAdpater } from './user.adapter';

@Injectable()
export class UserStore {
  usersReceived$ = this.users.get().pipe(
    map((res) => res.users),
    toSource('[User] usersReceived$')
  );
  userAdded$ = new Source<User>('[User] userAdded$');
  userUpdate$ = new Source<User>('[User] userUpdate$');
  friendAdded$ = new Subject<User>();
  friendAddedSource$ = this.friendAdded$.pipe(
    map(user => ({ user, friend: { id: `random-friend-${Math.random()}` } })),
    toSource('[User] friendAdded$'),
  );
  friendRemoved$ = new Source<User>('[User] friendRemoved$');
  userRemoved$ = new Source<User>('[User] userRemoved$');

  store = this.adapt.init(['adapt.users', userAdpater, defaultUserState], {
    loadUsers: this.usersReceived$,
    addUser: this.userAdded$,
    updateUser: this.userUpdate$,
    addFriend: this.friendAddedSource$,
    removeFriend: this.friendRemoved$,
    removeUser: this.userRemoved$,
  });

  users$ = this.store.users$;
  loading$ = this.store.loading$;

  constructor(private adapt: AdaptCommon, private users: UsersService) {}
}
