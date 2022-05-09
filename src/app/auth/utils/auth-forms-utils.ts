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

    if (hasError(FormsErrorsKeys.pattern) && field === FormControls.pass) {
      const { digit, upperCase, lowerCase, symbol } = ERROR_MESSAGES[FormControls.pass].weak!;

      switch (form.get(FormControls.pass)?.errors?.[FormsErrorsKeys.pattern].requiredPattern) {
        case FORMS_PATTERNS.digit.toString():
          return digit;
        case FORMS_PATTERNS.upperCase.toString():
          return upperCase;
        case FORMS_PATTERNS.symbol.toString():
          return symbol;
        case FORMS_PATTERNS.lowerCase.toString():
          return lowerCase;
        default:
          return ERROR_MESSAGES[FormControls.pass].unknown;
      }
    }

    if (hasError(FormsErrorsKeys.minLen)) {
      return ERROR_MESSAGES[field].minlength;
    }

    if (hasError(FormsErrorsKeys.maxLen)) {
      return ERROR_MESSAGES[field].maxlength;
    }

    return ERROR_MESSAGES[field].unknown;
  }

  static isFieldInvalid(form: FormGroup, field: FormControls) {
    return form.get(field)?.invalid;
  }
}
