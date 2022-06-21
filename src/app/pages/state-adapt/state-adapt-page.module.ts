import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateAdaptRoutingPageModule } from './state-adapt-routing-page.module';
import { StateAdaptPageComponent } from './state-adapt-page.component';
// import { StoreModule } from '@state-adapt/store';
import { userFeatureKey, userReducer } from '@services/state-adapt/user.reducers';
import { UserListStateAdaptModule } from './user-list-state-adapt/user-list-state-adapt.module';
import { FormsModule } from '@angular/forms';

/**
 * StateAdaptPageModule
 */
@NgModule({
  declarations: [StateAdaptPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    StateAdaptRoutingPageModule,
    StoreModule.forFeature(userFeatureKey, userReducer),
    UserListStateAdaptModule,
  ],
})
export class StateAdaptPageModule {}
