import { createAction, props } from '@ngrx/store';
import { SignUpForm } from './sign-up.model';

export const actionFormUpdate = createAction(
  '[Form] Update',
  props<{ form: SignUpForm }>()
);

export const actionFormReset = createAction('[Form] Reset');
