// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
// ================

// Components
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { UserSettingsPageComponent } from './pages/user-settings-page/user-settings-page.component';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { AuthFormBaseComponent } from './components/auth-form-base/auth-form-base.component';
import { SharedModule } from '../shared/shared.module';
// ================

@NgModule({
  declarations: [
    LoginPageComponent,
    UserSettingsPageComponent,
    AuthFormComponent,
    AuthFormBaseComponent,
  ],
  imports: [CommonModule, SharedModule, AuthRoutingModule, ReactiveFormsModule],
})
export class AuthModule {}
