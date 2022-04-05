import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ElfPageComponent } from './elf-page.component';

const routes: Routes = [
    {
      path: '', component: ElfPageComponent,
      children: []
    }
];

/**
 * ElfRoutingModule
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ElfRoutingPageModule { }

