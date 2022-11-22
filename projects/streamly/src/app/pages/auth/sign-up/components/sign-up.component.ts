import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import {
  NotificationService,
  ROUTE_ANIMATIONS_ELEMENTS
} from '../../../../core/core.module';

import { State } from '../../auth.state';
import { actionFormReset, actionFormUpdate } from '../sign-up.actions';
import { SignUpForm } from '../sign-up.model';
import { selectFormState } from '../sign-up.selectors';

@Component({
  selector: 'streamly-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  formValueChanges$: Observable<SignUpForm> | undefined;

  constructor(
    private fb: UntypedFormBuilder,
    private store: Store<State>,
    private translate: TranslateService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.store
      .pipe(select(selectFormState), take(1))
      .subscribe((form) => this.form.patchValue(form.form));
  }

  save() {
    this.store.dispatch(actionFormUpdate({ form: this.form.value }));
  }

  submit() {
    // TODO BG remove
    if (this.form.valid) {
      this.save();
      this.notificationService.info(
        (this.form.value.requestGift
          ? this.translate.instant('streamly.examples.form.text4')
          : this.translate.instant('streamly.examples.form.text5')) +
          ' : ' +
          this.translate.instant('streamly.examples.form.text6')
      );
    }
  }

  reset() {
    this.form.reset();
    this.form.clearValidators();
    this.form.clearAsyncValidators();
    this.store.dispatch(actionFormReset());
  }
}
