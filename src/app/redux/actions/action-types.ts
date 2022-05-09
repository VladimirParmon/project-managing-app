export enum ActionTypes {
  addFullUserData = '[USER DATA] store all user data properties',
  addPartUserData = '[USER DATA] store some user data properties',

  signUpSubmit = '[AUTH SIGNUP] user sign up',
  logInSubmit = '[AUTH LOGIN] user log in',

  logOutSubmit = '[AUTH LOGOUT] user log out',

  afterLoggedIn = '[AUTH SUCCEED] fill user data properties after log in',

  throwAppError = '[ERROR] throw some error',
  newAppError = '[ERROR] save code and message of error',
}
