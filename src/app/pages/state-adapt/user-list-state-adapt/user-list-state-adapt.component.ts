import { Component, OnInit } from '@angular/core';
import { User } from '@models/user.state';
import { UserStoreStateAdaptService } from '@services/state-adapt/user-store-state-adapt.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-list-state-adapt',
  templateUrl: './user-list-state-adapt.component.html',
  styleUrls: ['./user-list-state-adapt.component.scss'],
})
export class UserListStateAdaptComponent implements OnInit {
  users$!: Observable<User[]>;
  /**
   * Class constructor
   */
  constructor(private storage: UserStoreStateAdaptService) {}

  ngOnInit(): void {
    this.users$ = this.storage.getUsers();
  }

  userId(_: number, user: User) {
    return user.userId;
  }
}
