import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxsPageComponent } from './ngxs-page.component';

const routes: Routes = [
    {
      path: '', component: NgxsPageComponent,
      children: []
    }
];

/**
 * NgxsRoutingModule
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NgxsRoutingPageModule { }

