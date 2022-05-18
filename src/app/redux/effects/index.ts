import { BoardsEffects } from './board.effects';
import { UserLogInEffect } from './user-log-in.effect';
import { UserSignUpEffect } from './user-sign-up.effect';
import { ErrorEffect } from './error.effect';
import { ColumnEffects } from './column.effects';
import { TaskEffects } from './task.effects';
import { UserUpdateDataEffect } from './user-update-data.effects';
import { UserDeleteEffect } from './user-delete.effects';
import { loaderEffects } from './loader.effects';

export const effects = [
  UserSignUpEffect,
  UserLogInEffect,
  ErrorEffect,
  BoardsEffects,
  ColumnEffects,
  TaskEffects,
  UserUpdateDataEffect,
  UserDeleteEffect,
  loaderEffects,
];
