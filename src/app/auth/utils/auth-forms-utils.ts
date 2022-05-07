import { FormGroup } from '@angular/forms';
import {
  FormsErrorsKeys,
  ERROR_MESSAGES,
  FORMS_PATTERNS,
  FormControls,
} from '../constants/auth-form.constants';

export class AuthFormsUtils {
  static getErrorMessageText(form: FormGroup, field: FormControls) {
    const hasError = (key: FormsErrorsKeys) => form.get(field)?.hasError(key);

    if (hasError(FormsErrorsKeys.mail)) {
      return ERROR_MESSAGES[field].email;
    }

    if (hasError(FormsErrorsKeys.req)) {
      return ERROR_MESSAGES[field].req;
    }

    if (hasError(FormsErrorsKeys.minLen)) {
      return ERROR_MESSAGES[field].minlength;
    }

    if (hasError(FormsErrorsKeys.maxLen)) {
      return ERROR_MESSAGES[field].maxlength;
    }

    if (hasError(FormsErrorsKeys.pattern) && field === FormControls.pass) {
      const { base, digit, upperCase, lowerCase, symbol } = ERROR_MESSAGES[FormControls.pass].weak!;

      switch (form.get(FormControls.pass)?.errors?.[FormsErrorsKeys.pattern].requiredPattern) {
        case FORMS_PATTERNS.digit.toString():
          return `${base}: ${digit}`;
        case FORMS_PATTERNS.upperCase.toString():
          return `${base}: ${upperCase}`;
        case FORMS_PATTERNS.symbol.toString():
          return `${base}: ${symbol}`;
        case FORMS_PATTERNS.lowerCase.toString():
          return `${base}: ${lowerCase}`;
        default:
          return ERROR_MESSAGES[FormControls.pass].unknown;
      }
    }

    return ERROR_MESSAGES[field].unknown;
  }

  static isFieldInvalid(form: FormGroup, field: FormControls) {
    return form.get(field)?.invalid;
  }
}
