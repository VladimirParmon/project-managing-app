import { MAStore } from './store.model';

export const initialState: MAStore = {
  boards: [],
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
};
