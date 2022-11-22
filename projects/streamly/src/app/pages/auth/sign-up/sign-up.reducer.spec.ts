import { SignUpForm } from './sign-up.model';
import { formReducer, initialState } from './sign-up.reducer';
import { actionFormReset, actionFormUpdate } from './sign-up.actions';

describe('SignUpFormReducer', () => {
  const form: SignUpForm = {
    email: 'test@test.test',
    password: 'test'
  };

  it('should return the default state', () => {
    const action = {} as any;
    const state = formReducer(undefined, action);
    expect(state).toBe(initialState);
  });

  it('should update the form', () => {
    const action = actionFormUpdate({
      form: { ...form, email: 'updated@test.com' }
    });
    const state = formReducer(initialState, action);
    expect(state.form.email).toBe('updated@test.com');
  });

  it('should reset the form', () => {
    const action = actionFormReset();
    const state = formReducer(undefined, action);
    expect(state).toEqual(initialState);
  });
});
