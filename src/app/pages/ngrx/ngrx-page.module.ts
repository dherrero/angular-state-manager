import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgrxRoutingPageModule } from './ngrx-routing-page.module';
import { NgrxPageComponent } from './ngrx-page.component';
import { StoreModule } from '@ngrx/store';
import { userFeatureKey, userReducer } from '@services/ngrx/user.reducers';
import { UserListNgrxModule } from './user-list-ngrx/user-list-ngrx.module';
import { FormsModule } from '@angular/forms';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '@environment';
import { UserStoreNgrxService } from '@services/ngrx/user-store-ngrx.service';

/**
 * NgrxPageModule
 */
@NgModule({
  declarations: [NgrxPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgrxRoutingPageModule,
    StoreModule.forRoot({[userFeatureKey]: userReducer}),
    StoreDevtoolsModule.instrument({
      name: 'NgRx demo',
      maxAge: 25,
      logOnly: environment.production,
    }),
    UserListNgrxModule,
  ],
  providers: [UserStoreNgrxService]
})
export class NgrxPageModule {}
