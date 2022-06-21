import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StateAdaptPageComponent } from './state-adapt-page.component';

const routes: Routes = [
    {
      path: '', component: StateAdaptPageComponent,
      children: []
    }
];

/**
 * StateAdaptRoutingModule
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StateAdaptRoutingPageModule { }

