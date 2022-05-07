import { UserErrorEffect } from './user-error.effect';
import { UserLogInEffect } from './user-log-in.effect';
import { UserSignUpEffect } from './user-sign-up.effect';

export const effects = [UserSignUpEffect, UserLogInEffect, UserErrorEffect];
