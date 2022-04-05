import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgrxPageComponent } from './ngrx-page.component';

const routes: Routes = [
    {
      path: '', component: NgrxPageComponent,
      children: []
    }
];

/**
 * NgrxRoutingModule
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NgrxRoutingPageModule { }

