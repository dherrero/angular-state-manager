import { Component, OnInit } from '@angular/core';
import { User } from '@models/user.state';
import { UserStoreNgrxService } from '@services/ngrx/user-store-ngrx.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-list-ngrx',
  templateUrl: './user-list-ngrx.component.html',
  styleUrls: ['./user-list-ngrx.component.scss']
})
export class UserListNgrxComponent implements OnInit {
  users$!: Observable<User[]>;
  /**
   * Class constructor
   */
  constructor(private storage: UserStoreNgrxService) {}

  ngOnInit(): void {
    this.users$ = this.storage.getUsers();
  }

  userId(_: number, user: User) {
    return user.userId;
  }
}
