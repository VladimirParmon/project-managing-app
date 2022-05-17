// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';
// ================

// Components
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { UserSettingsPageComponent } from './pages/user-settings-page/user-settings-page.component';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { AuthFormBaseComponent } from './components/auth-form-base/auth-form-base.component';
// ================

@NgModule({
  declarations: [
    LoginPageComponent,
    UserSettingsPageComponent,
    AuthFormComponent,
    AuthFormBaseComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
  ],
})
export class AuthModule {}
