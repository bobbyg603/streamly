import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { WatchComponent } from './watch/watch.component';
import { HomeRoutingModule } from './watch-routing.module';

@NgModule({
  declarations: [WatchComponent],
  imports: [CommonModule, SharedModule, HomeRoutingModule]
})
export class WatchModule {}
