export enum FormMode {
  login = 'login',
  registration = 'registration',
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
    req: 'Please enter your name',
    unknown: 'There is a problem with your name',
  },
  login: {
    req: 'Please enter a login email',
    email: 'Please enter a correct email address',
    unknown: 'There is a problem with your login email',
  },
  password: {
    req: 'You must enter the password',
    minlength: `Your password must contain at least ${LoginFormLimits.passMinLen} symbols`,
    pattern: 'Some problem with pattern',
    weak: {
      base: "Your password isn't strong enough",
      digit: 'add digit',
      upperCase: 'add uppercase letter',
      lowerCase: 'add lowercase letter',
      symbol: 'add special symbol: -+_!@#$%^&*.,?',
    },
    unknown: 'There is a problem with your password',
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
