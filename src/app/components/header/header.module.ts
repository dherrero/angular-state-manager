import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { DomainUserModule } from '@pipes/domain-user/domain-user.module';
import { RouterModule } from '@angular/router';

/**
 * HeaderModule
 */
@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, DomainUserModule, RouterModule],
  exports: [HeaderComponent],
})
export class HeaderModule {}
