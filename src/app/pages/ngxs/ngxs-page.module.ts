import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsRoutingPageModule } from './ngxs-routing-page.module';
import { NgxsPageComponent } from './ngxs-page.component';
import { FormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { environment } from '@environment';
import { UserStoreNgxsSate } from '@services/ngxs/user-ngxs.state';
import { UserListNgxsModule } from './user-list-ngxs/user-list-ngxs.module';
import { UserStoreNgxsService } from '@services/ngxs/user-store-ngxs.service';

/**
 * NgxsPageModule
 */
@NgModule({
  declarations: [NgxsPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgxsRoutingPageModule,
    NgxsModule.forRoot([UserStoreNgxsSate], {
      developmentMode: !environment.production,
    }),
    UserListNgxsModule,
  ],
  providers: [UserStoreNgxsService],
})
export class NgxsPageModule {}
