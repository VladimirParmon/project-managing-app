import { MAStore } from './store.model';

export const initialState: MAStore = {
  isLoading: false,
  boardInfo: [],
  boards: [],
  tasks: [],
  user: {
    id: '',
    name: '',
    login: '',
    token: '',
  },
  appError: {
    code: 0,
    message: '',
  },
  currentBoardTitle: '',
};
