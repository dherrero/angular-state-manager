import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListNgrxComponent } from './user-list-ngrx.component';



/**
 * UserListNgrxModule
 */
@NgModule({
  declarations: [
    UserListNgrxComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    UserListNgrxComponent
  ]
})
export class UserListNgrxModule { }
