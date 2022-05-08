import { BoardsEffects } from './boards.effects';
import { UserLogInEffect } from './user-log-in.effect';
import { UserSignUpEffect } from './user-sign-up.effect';
import { ErrorEffect } from './error.effect';

export const effects = [UserSignUpEffect, UserLogInEffect, ErrorEffect, BoardsEffects];
