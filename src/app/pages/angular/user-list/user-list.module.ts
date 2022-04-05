import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list.component';



/**
 * UserListModule
 */
@NgModule({
  declarations: [
    UserListComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    UserListComponent
  ]
})
export class UserListModule { }
