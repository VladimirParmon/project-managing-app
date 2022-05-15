export enum ActionTypes {
  addFullUserData = '[USER DATA] store all user data properties',
  addPartUserData = '[USER DATA] store some user data properties',

  signUpSubmit = '[AUTH SIGNUP] user sign up',
  logInSubmit = '[AUTH LOGIN] user log in',

  logOutSubmit = '[AUTH LOGOUT] user log out',

  afterLoggedIn = '[AUTH SUCCEED] fill user data properties after log in',

  throwAppError = '[ERROR] throw some error',
  newAppError = '[ERROR] save code and message of error',

  fetchBoards = '[BOARDS] fetch boards',
  boardsFetched = '[BOARDS SUCCEED] boards fetched',
  createBoard = '[BOARDS] create board',
  setNewBoard = '[BOARDS] set new board',
  handleDeleteBoard = '[BOARDS] handle delete board',
  deleteBoard = '[BOARDS HANDLED] delete board',

  createColumn = '[COLUMN] create new column',
  setNewColumn = '[COLUMN] set new columns',
  handleDeleteColumn = '[COLUMN] handle delete column',
  deleteColumn = '[COLUMN HANDLED] delete column',
  fetchBoard = '[COLUMN] fetch column in board',
  boardFetched = '[COLUMN SUCCEED] columns in board fetched',
  handleFixColumnOrder = '[COLUMN] handle fix column order',
  fixColumnOrder = '[COLUMN HANDLED] fix handled column order',

  handleSaveOpenedBoardName = '[BOARDS] save board title in local storage for routing',
  saveOpenedBoardName = '[BOARDS] save board title in app store to display it on the page',

  postNewTask = '[TASK] post a new task to server',
  storeNewTask = '[TASK] save a new task to store',
  deleteTaskServer = '[TASK] delete a task from server',
  deleteTaskStore = '[TASK] delete a task from store',
  storeAllBoardTasks = '[TASK] store all tasks that are presented in the columns of opened board',
}
