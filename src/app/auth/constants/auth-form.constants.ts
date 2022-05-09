export enum FormMode {
  login = 'auth.log_in',
  registration = 'auth.registration',
}

export const FORMS_PATTERNS = {
  digit: /(?=.*\d)/,
  lowerCase: /(?=.*[a-z])/,
  upperCase: /(?=.*[A-Z])/,
  symbol: /(?=.*[-+_!@#$%^&*.,?])/,
};

export enum LoginFormLimits {
  nameMinLen = 3,
  passMinLen = 8,
}

export enum FormControls {
  name = 'name',
  login = 'login',
  pass = 'password',
}

export const ERROR_MESSAGES: ErrorsBase = {
  name: {
    req: 'error_messages.name.req',
    minlength: 'error_messages.name.minLength',
    unknown: 'error_messages.name.unknown',
  },
  login: {
    req: 'error_messages.login.req',
    email: 'error_messages.login.email',
    unknown: 'error_messages.login.unknown',
  },
  password: {
    req: 'error_messages.password.req',
    minlength: 'error_messages.password.minlength',
    pattern: 'error_messages.password.pattern',
    weak: {
      base: 'error_messages.password.weak.base',
      digit: 'error_messages.password.weak.digit',
      upperCase: 'error_messages.password.weak.upperCase',
      lowerCase: 'error_messages.password.weak.lowerCase',
      symbol: 'error_messages.password.weak.symbol',
    },
    unknown: 'error_messages.password.unknown',
  },
};

interface ErrorsBase {
  [formaPart: string]: ErrorsBaseList;
}

type ErrorsBaseList = {
  req?: string;
  length?: string;
  pattern?: string;
  unknown?: string;
  minlength?: string;
  maxlength?: string;
  email?: string;
  weak?: { [weakKey: string]: string };
};

export enum FormsErrorsKeys {
  req = 'required',
  minLen = 'minlength',
  maxLen = 'maxlength',
  pattern = 'pattern',
  mail = 'email',
}
