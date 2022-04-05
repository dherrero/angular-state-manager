import { Injectable } from '@angular/core';
import { UsersService } from '@services/users.service';
import { UserRequest } from '@interfaces/user.request';
import { UserState, User, defaultUserState } from '@models/user.state';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map, take, tap } from 'rxjs/operators';

/**
 * UserStoreService
 */
@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  private readonly $dataSource = new BehaviorSubject<UserState>(defaultUserState);
  private readonly data$: Observable<UserState> = this.$dataSource.asObservable().pipe(distinctUntilChanged());

  /**
   * Class constructor
   */
  constructor(private users: UsersService) {
    this.$fetchUsers();
  }

  // GETTERS
  isLoading(): Observable<boolean> {
    return this.data$.pipe(
      map((state) => state.loading),
      distinctUntilChanged()
    );
  }

  getUsers(): Observable<User[]> {
    return this.data$.pipe(
      map((state) => state.users),
      distinctUntilChanged()
    );
  }

  // ACTIONS
  addUser(user: User) {
    this.$setData([...this.$dataSource.getValue().users, user]);
  }

  updateUser(user: User) {
    const users = this.$dataSource.getValue().users.map((u) => (u.userId === user.userId ? { ...user } : u));
    this.$setData([...users]);
  }

  removeUser(user: User) {
    const users = this.$dataSource.getValue().users.filter((u) => u.userId !== user.userId);
    this.$setData([...users]);
  }

  // PRIVATE METHODS
  private $setData(users: User[]) {
    this.$dataSource.next({ loading: false, users: [...users] });
  }

  private $fetchUsers() {
    this.users
      .get()
      .pipe(
        tap((results: UserRequest) => {
          this.$setData(results.users);
        }),
        take(1)
      )
      .subscribe();
  }
}
