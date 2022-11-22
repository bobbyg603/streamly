import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { NotificationService } from '../../../../core/core.module';
import { SharedModule } from '../../../../shared/shared.module';

import { SignUpComponent } from './sign-up.component';
import { selectFormState } from '../sign-up.selectors';
import { SignUpForm } from '../sign-up.model';

import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatLegacyInputHarness as MatInputHarness } from '@angular/material/legacy-input/testing';
import { MatLegacyButtonHarness as MatButtonHarness } from '@angular/material/legacy-button/testing';

describe('SignUpComponent', () => {
  let store: MockStore;
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let dispatchSpy: jasmine.Spy;
  let loader: HarnessLoader;

  const getInput = (fieldName: string) =>
    loader.getHarness(
      MatInputHarness.with({ selector: `[formControlName="${fieldName}"]` })
    );

  const getSaveButton = () =>
    loader.getHarness(
      MatButtonHarness.with({ text: 'streamly.examples.form.save' })
    );

  const getResetButton = async () =>
    loader.getHarness(
      MatButtonHarness.with({ text: 'streamly.examples.form.reset' })
    );

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [SharedModule, NoopAnimationsModule, TranslateModule.forRoot()],
      declarations: [SignUpComponent],
      providers: [provideMockStore(), NotificationService]
    });

    store = TestBed.inject(MockStore);
    store.overrideSelector(selectFormState, { form: {} as SignUpForm });
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);

    dispatchSpy = spyOn(store, 'dispatch');
  });

  it('should save form', async () => {
    const usernameInput = await getInput('username');
    const saveButton = await getSaveButton();

    await usernameInput.setValue('bobbyg603');
    await saveButton.click();

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy.calls.mostRecent().args[0].type).toBe('[Form] Update');
    expect(dispatchSpy.calls.mostRecent().args[0].form).toEqual({
      autosave: false,
      username: 'bobbyg603',
      password: '',
      email: '',
      description: '',
      requestGift: '',
      birthday: '',
      rating: 0
    });
  });

  it('should reset form', async () => {
    const usernameInput = await getInput('username');
    const resetButton = await getResetButton();

    await usernameInput.setValue('bobbyg603');
    await resetButton.click();
    const usernameValue = await usernameInput.getValue();

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy.calls.mostRecent().args[0].type).toBe('[Form] Reset');
    expect(usernameValue).toBe('');
  });
});
