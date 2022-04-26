import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { UserSettingsPageComponent } from './pages/user-settings-page/user-settings-page.component';

@NgModule({
  declarations: [LoginPageComponent, UserSettingsPageComponent],
  imports: [CommonModule, AuthRoutingModule],
})
export class AuthModule {}
