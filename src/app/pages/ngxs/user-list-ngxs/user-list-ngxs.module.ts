import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListNgxsComponent } from './user-list-ngxs.component';



/**
 * UserListNgxsModule
 */
@NgModule({
  declarations: [
    UserListNgxsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    UserListNgxsComponent
  ]
})
export class UserListNgxsModule { }
