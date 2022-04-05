import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListElfComponent } from './user-list-elf.component';



/**
 * UserListElfModule
 */
@NgModule({
  declarations: [
    UserListElfComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    UserListElfComponent
  ]
})
export class UserListElfModule { }
