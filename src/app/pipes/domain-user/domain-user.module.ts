import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomainUserPipe } from './domain-user.pipe';



/**
 * DomainUserModule
 */
@NgModule({
  declarations: [
    DomainUserPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DomainUserPipe
  ]
})
export class DomainUserModule { }
