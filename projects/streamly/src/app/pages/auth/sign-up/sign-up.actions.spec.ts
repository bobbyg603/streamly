import { SignUpForm } from './sign-up.model';
import { actionFormUpdate, actionFormReset } from './sign-up.actions';

describe('SignUpForm Actions', () => {
  it('should create ActionFormUpdate action', () => {
    const testForm: SignUpForm = {
      email: 'test@test.test',
      password: 'test'
    };
    const action = actionFormUpdate({
      form: testForm
    });
    expect(action.type).toEqual(actionFormUpdate.type);
    expect(action.form).toEqual(jasmine.objectContaining(testForm));
  });

  it('should create ActionFormReset action', () => {
    const action = actionFormReset();
    expect(action.type).toEqual(actionFormReset.type);
  });
});
