import { LazyElementsModule } from '@angular-extensions/elements';
import { HttpClient } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { environment } from '../../../environments/environment';
import { SharedModule } from '../../shared/shared.module';

import { ExamplesRoutingModule } from './auth-routing.module';
import { AuthEffects } from './auth.effects';
import { FEATURE_NAME, reducers } from './auth.state';
import { AuthComponent } from './auth/auth.component';
import { SignUpComponent } from './sign-up/components/sign-up.component';
import { SignUpFormEffects } from './sign-up/sign-up.effects';

export function httpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    `${environment.i18nPrefix}/assets/i18n/examples/`,
    '.json'
  );
}

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    LazyElementsModule,
    SharedModule,
    ExamplesRoutingModule,
    StoreModule.forFeature(FEATURE_NAME, reducers),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      },
      isolate: true
    }),
    EffectsModule.forFeature([AuthEffects, SignUpFormEffects])
  ],
  declarations: [AuthComponent, SignUpComponent],
  providers: []
})
export class AuthModule {
  constructor() {}
}
