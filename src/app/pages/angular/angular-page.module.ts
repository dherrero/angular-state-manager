import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeRoutingPageModule } from './angular-routing-page.module';
import { AngularPageComponent } from './angular-page.component';
import { UserListModule } from './user-list/user-list.module';

/**
 * HomePageModule
 */
@NgModule({
  declarations: [AngularPageComponent],
  imports: [CommonModule, FormsModule, HomeRoutingPageModule, UserListModule],
})
export class HomePageModule {}
