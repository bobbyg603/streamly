import { createSelector } from '@ngrx/store';

import { AuthState, selectExamples } from '../auth.state';

export const selectFormState = createSelector(
  selectExamples,
  (state: AuthState) => state.signUpForm
);
