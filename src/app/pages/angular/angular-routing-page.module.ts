import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularPageComponent } from './angular-page.component';

const routes: Routes = [
  {
    path: '',
    component: AngularPageComponent,
    children: []
  }
];

/**
 * HomeRoutingModule
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingPageModule {}
