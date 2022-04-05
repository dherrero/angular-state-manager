import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { User } from '@models/user.state';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserStoreService } from '@services/angular/user-store.service';
import { Observable } from 'rxjs';

/**
 * AngularPage.Component
 */
@Component({
  selector: 'app-angular',
  templateUrl: './angular-page.component.html',
  styleUrls: ['./angular-page.component.scss'],
})
export class AngularPageComponent implements OnInit {
  loading$!: Observable<boolean>;
  users$!: Observable<User[]>;

  userSelected!: User;

  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<unknown>;

  constructor(
    private userStore: UserStoreService,
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
    // Los servicios Angular puros no protegen el estado y
    // podemos actualizar directamente los Friends del usuario con:
    // user.friends.push({ id: `random-friend-${Math.random()}` });
    // Esto es debido a que el array de friends se pasa por referencia
    // pero no es buena práctica modificar el estado sin los métodos creados para ello
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
