import { BoardsEffects } from './board.effects';
import { UserLogInEffect } from './user-log-in.effect';
import { UserSignUpEffect } from './user-sign-up.effect';
import { ErrorEffect } from './error.effect';
import { ColumnEffects } from './column.effects';
import { TaskEffects } from './task.effects';

export const effects = [
  UserSignUpEffect,
  UserLogInEffect,
  ErrorEffect,
  BoardsEffects,
  ColumnEffects,
  TaskEffects,
];
