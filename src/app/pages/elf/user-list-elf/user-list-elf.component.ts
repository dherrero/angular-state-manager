import { Component, OnInit } from '@angular/core';
import { User } from '@models/user.state';
import { UserStoreElfService } from '@services/elf/user-store-elf.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-list-elf',
  templateUrl: './user-list-elf.component.html',
  styleUrls: ['./user-list-elf.component.scss']
})
export class UserListElfComponent implements OnInit {
  users$!: Observable<User[]>;
  /**
   * Class constructor
   */
  constructor(private storage: UserStoreElfService) {}

  ngOnInit(): void {
    this.users$ = this.storage.getUsers();
  }

  userId(_: number, user: User) {
    return user.userId;
  }
}
