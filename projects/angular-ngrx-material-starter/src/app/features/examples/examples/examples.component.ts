import { Store, select } from '@ngrx/store';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

import {
  routeAnimations,
  selectIsAuthenticated
} from '../../../core/core.module';

import { State } from '../examples.state';

@Component({
  selector: 'streamly-examples',
  templateUrl: './examples.component.html',
  styleUrls: ['./examples.component.scss'],
  animations: [routeAnimations],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExamplesComponent implements OnInit {
  isAuthenticated$: Observable<boolean> | undefined;

  examples = [
    { link: 'todos', label: 'streamly.examples.menu.todos' },
    { link: 'stock-market', label: 'streamly.examples.menu.stocks' },
    { link: 'theming', label: 'streamly.examples.menu.theming' },
    { link: 'crud', label: 'streamly.examples.menu.crud' },
    {
      link: 'simple-state-management',
      label: 'streamly.examples.menu.simple-state-management'
    },
    { link: 'form', label: 'streamly.examples.menu.form' },
    { link: 'notifications', label: 'streamly.examples.menu.notifications' },
    { link: 'elements', label: 'streamly.examples.menu.elements' },
    { link: 'authenticated', label: 'streamly.examples.menu.auth', auth: true }
  ];

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));
  }
}
