import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/angular/angular-page.module').then(
        (m) => m.HomePageModule
      ),
  },
  {
    path: 'elf',
    loadChildren: () =>
      import('./pages/elf/elf-page.module').then((m) => m.ElfPageModule),
  },
  {
    path: 'ngrx',
    loadChildren: () =>
      import('./pages/ngrx/ngrx-page.module').then((m) => m.NgrxPageModule),
  },
  {
    path: 'ngxs',
    loadChildren: () =>
      import('./pages/ngxs/ngxs-page.module').then((m) => m.NgxsPageModule),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
