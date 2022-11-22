import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import { AppState } from '../../core/core.module';

import { SignUpFormState } from './sign-up/sign-up.model';
import { formReducer } from './sign-up/sign-up.reducer';

export const FEATURE_NAME = 'auth';
export const selectExamples = createFeatureSelector<AuthState>(FEATURE_NAME);
export const reducers: ActionReducerMap<AuthState> = {
  signUpForm: formReducer
};

export interface AuthState {
  signUpForm: SignUpFormState;
}

export interface State extends AppState {
  examples: AuthState;
}
