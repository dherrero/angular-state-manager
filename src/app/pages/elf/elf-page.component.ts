import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { User } from '@models/user.state';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserStoreElfService } from '@services/elf/user-store-elf.service';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';

/**
 * ElfPage.Component
 */
@Component({
  selector: 'app-elf',
  templateUrl: './elf-page.component.html',
  styleUrls: ['./elf-page.component.scss'],
})
export class ElfPageComponent implements OnInit {
  loading$!: Observable<boolean>;
  users$!: Observable<User[]>;

  userSelected!: User;

  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<unknown>;

  constructor(
    private userStore: UserStoreElfService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.loading$ = this.userStore.isLoading();
    this.users$ = this.userStore.getUsers();
  }

  userId(_: number, user: User) {
    return user.userId;
  }

  renameUser(user: User) {
    this.userSelected = { ...user, friends: [...user.friends] };
    this.modalService.open(this.dialogTemplate).result.finally(() => {
      this.userStore.updateUser({
        ...this.userSelected,
        friends: [...this.userSelected.friends],
      });
    });
  }

  addFriend(e: Event, user: User) {
    e.stopPropagation();
    const userUpdate = this.copyUser(user);
    userUpdate.friends.push({ id: `random-friend-${Math.random()}` });
    this.userStore.updateUser(userUpdate);
    // Con Elf tampoco protege el estado con lo que se puede invocar directamente a
    // user.friends.push({ id: `random-friend-${Math.random()}` });
    // pero no es buena práctica xq perdemos el flujo de actualización
  }

  removeFriend(e: Event, user: User) {
    e.stopPropagation();
    const userUpdate = this.copyUser(user);
    userUpdate.friends.pop();
    this.userStore.updateUser(userUpdate);
  }

  removeUser(e: Event, user: User) {
    e.stopPropagation();
    this.userStore.removeUser(user);
  }

  private copyUser(user: User): User {
    return { ...user, friends: [...user.friends] };
  }
}
