interface StoreUser {
  id?: string;
  name?: string;
  login?: string;
  token?: string;
}

interface StoreError {
  code: number;
  message: string;
}

interface MAStore {
  user: StoreUser;
  userApiError: StoreError;
}
