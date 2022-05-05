export enum ActionTypes {
  addFullUserData = '[USER DATA] store all user data properties',
  addPartUserData = '[USER DATA] store some user data properties',

  signUpSubmit = '[AUTH SIGNUP] user sign up',
  logInSubmit = '[AUTH LOGIN] user log in',

  afterLoggedIn = '[AUTH SUCCEED] fill user data properties after log in',

  throwAuthError = '[AUTH ERROR] throw auth error',
  newAuthError = '[AUTH ERROR] save auth error',
}
