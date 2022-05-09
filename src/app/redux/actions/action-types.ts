export enum ActionTypes {
  addFullUserData = '[USER DATA] store all user data properties',
  addPartUserData = '[USER DATA] store some user data properties',

  signUpSubmit = '[AUTH SIGNUP] user sign up',
  logInSubmit = '[AUTH LOGIN] user log in',

  afterLoggedIn = '[AUTH SUCCEED] fill user data properties after log in',

  throwAppError = '[ERROR] throw some error',
  newAppError = '[ERROR] save code and message of error',

  boardsFetched = '[BOARDS] boards fetched',
  createBoard = '[BOARDS] create board',
  deleteBoard = '[BOARDS] delete board',
  fetchBoards = '[BOARDS] fetch boards',
  handleDeleteBoard = '[BOARDS] handle delete board',
  setNewBoard = '[BOARDS] set new board',

  boardFetched = '[BOARD] board fetched',
  createColumn = '[BOARD] create board',
  deleteColumn = '[BOARD] delete column',
  fetchBoard = '[BOARD] fetch board',
  fixColumnOrder = '[BOARD] fix column order',
  handleDeleteColumn = '[BOARD] handle delete column',
  handleFixColumnOrder = '[BOARD] handle fix column order',
  setNewColumn = '[BOARD] set new column',
}
