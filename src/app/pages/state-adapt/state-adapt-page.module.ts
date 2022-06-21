import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateAdaptRoutingPageModule } from './state-adapt-routing-page.module';
import { StateAdaptPageComponent } from './state-adapt-page.component';
import { UserListStateAdaptModule } from './user-list-state-adapt/user-list-state-adapt.module';
import { FormsModule } from '@angular/forms';
import { defaultStoreProvider } from '@state-adapt/core';
import { UserStore } from '@services/state-adapt/user.store';

/**
 * StateAdaptPageModule
 */
@NgModule({
  declarations: [StateAdaptPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    StateAdaptRoutingPageModule,
    UserListStateAdaptModule,
  ],
  providers: [defaultStoreProvider, UserStore]
})
export class StateAdaptPageModule {}
