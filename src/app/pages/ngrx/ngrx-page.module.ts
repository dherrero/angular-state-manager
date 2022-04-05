import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgrxRoutingPageModule } from './ngrx-routing-page.module';
import { NgrxPageComponent } from './ngrx-page.component';
import { StoreModule } from '@ngrx/store';
import { userFeatureKey, userReducer } from '@services/ngrx/user.reducers';
import { UserListNgrxModule } from './user-list-ngrx/user-list-ngrx.module';
import { FormsModule } from '@angular/forms';

/**
 * NgrxPageModule
 */
@NgModule({
  declarations: [NgrxPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgrxRoutingPageModule,
    StoreModule.forFeature(userFeatureKey, userReducer),
    UserListNgrxModule,
  ],
})
export class NgrxPageModule {}
