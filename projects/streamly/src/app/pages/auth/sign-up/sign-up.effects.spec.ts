import * as assert from 'assert';
import { Actions, getEffectsMetadata } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { LocalStorageService } from '../../../core/core.module';

import { SignUpFormEffects, FORM_KEY } from './sign-up.effects';
import { SignUpForm } from './sign-up.model';
import { actionFormUpdate } from './sign-up.actions';

const scheduler = new TestScheduler((actual, expected) =>
  assert.deepStrictEqual(actual, expected)
);

describe('SignUpFormEffects', () => {
  let localStorageService: LocalStorageService;

  beforeEach(() => {
    localStorageService = jasmine.createSpyObj('LocalStorageService', [
      'setItem'
    ]);
  });

  describe('persistForm', () => {
    it('should not dispatch any action', () => {
      const actions = new Actions(EMPTY);
      const effect = new SignUpFormEffects(actions, localStorageService);
      const metadata = getEffectsMetadata(effect);

      expect(metadata.persistForm?.dispatch).toEqual(false);
    });

    it('should call setItem on LocalStorageService for UPDATE action', () => {
      scheduler.run((helpers) => {
        const { cold } = helpers;
        const form: SignUpForm = {
          email: 'test@test.test',
          password: 'test'
        };
        const action = actionFormUpdate({ form });
        const source = cold('a', { a: action });
        const actions = new Actions(source);
        const effect = new SignUpFormEffects(actions, localStorageService);

        effect.persistForm.subscribe(() => {
          expect(localStorageService.setItem).toHaveBeenCalledWith(FORM_KEY, {
            form
          });
        });
      });
    });
  });
});
