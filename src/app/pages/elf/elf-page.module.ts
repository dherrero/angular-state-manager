import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElfRoutingPageModule } from './elf-routing-page.module';
import { ElfPageComponent } from './elf-page.component';
import { FormsModule } from '@angular/forms';
import { UserListElfModule } from './user-list-elf/user-list-elf.module';

/**
 * ElfPageModule
 */
@NgModule({
  declarations: [ElfPageComponent],
  imports: [CommonModule, FormsModule, ElfRoutingPageModule, UserListElfModule],
})
export class ElfPageModule {}
