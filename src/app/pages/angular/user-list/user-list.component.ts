import { Component, OnInit } from '@angular/core';
import { User } from '@models/user.state';
import { UserStoreService } from '@services/angular/user-store.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
  users$!: Observable<User[]>;
  /**
   * Class constructor
   */
  constructor(public userStore: UserStoreService) {}

  userId(_: number, user: User) {
    return user.userId;
  }
}
