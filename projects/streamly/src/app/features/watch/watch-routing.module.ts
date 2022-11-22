import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WatchComponent } from './watch/watch.component';

const routes: Routes = [
  {
    path: '',
    component: WatchComponent,
    data: { title: 'streamly.menu.watch' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
