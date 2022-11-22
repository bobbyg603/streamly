import { SignUpFormState, SignUpForm } from './sign-up.model';
import { actionFormReset, actionFormUpdate } from './sign-up.actions';
import { Action, createReducer, on } from '@ngrx/store';

export const initialState: SignUpFormState = {
  form: {} as SignUpForm
};

const reducer = createReducer(
  initialState,
  on(actionFormUpdate, (state, { form }) => ({
    ...state,
    form: { ...form, password: '*'.repeat(form.password.length) }
  })),
  on(actionFormReset, () => initialState)
);

export function formReducer(
  state: SignUpFormState | undefined,
  action: Action
) {
  return reducer(state, action);
}
