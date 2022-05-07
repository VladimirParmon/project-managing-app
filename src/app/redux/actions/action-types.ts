export enum ActionTypes {
  addFullUserData = '[USER DATA] store all user data properties',
  addPartUserData = '[USER DATA] store some user data properties',

  signUpSubmit = '[AUTH SIGNUP] user sign up',
  logInSubmit = '[AUTH LOGIN] user log in',

  afterLoggedIn = '[AUTH SUCCEED] fill user data properties after log in',

  throwAuthError = '[AUTH ERROR] throw auth error',
  newAuthError = '[AUTH ERROR] save auth error',

  boardsFetched = '[BOARDS] boards fetched',
  createBoard = '[BOARDS] create board',
  deleteBoard = '[BOARDS] delete board',
  fetchBoards = '[BOARDS] fetch boards',
  handleDeleteBoard = '[BOARDS] handle delete board',
  setNewBoard = '[BOARDS] set new board',
}
