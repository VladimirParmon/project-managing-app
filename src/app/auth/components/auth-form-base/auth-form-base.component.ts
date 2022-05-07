import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  FormControls,
  FormMode,
  FORMS_PATTERNS,
  LoginFormLimits,
} from '../../constants/auth-form.constants';
import { UserLogIn, UserSignUp } from '../../models/auth.model';
import { AuthFormsUtils } from '../../utils/auth-forms-utils';

@Component({
  selector: 'ma-auth-form-base',
  templateUrl: './auth-form-base.component.html',
  styleUrls: ['./auth-form-base.component.scss'],
})
export class AuthFormBaseComponent implements OnChanges, OnDestroy {
  @Input() mode: FormMode = FormMode.registration;

  @Output() formSubmit = new EventEmitter<UserSignUp | UserLogIn>();

  readonly FormControls = FormControls;

  public isRegistrationForm: boolean = true;

  public isPassHidden = true;

  public Form: FormGroup | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    this.Form = null;

    this.isRegistrationForm = changes['mode'].currentValue === FormMode.registration;

    this.Form = new FormGroup({
      [FormControls.login]: new FormControl('', [Validators.required, Validators.email]),
      [FormControls.pass]: new FormControl('', [
        Validators.required,
        Validators.minLength(LoginFormLimits.passMinLen),
        Validators.pattern(FORMS_PATTERNS.digit),
        Validators.pattern(FORMS_PATTERNS.lowerCase),
        Validators.pattern(FORMS_PATTERNS.upperCase),
        Validators.pattern(FORMS_PATTERNS.symbol),
      ]),
    });

    if (this.isRegistrationForm) {
      this.Form.addControl(
        FormControls.name,
        new FormControl('', [Validators.required, Validators.minLength(LoginFormLimits.nameMinLen)])
      );
    }
  }

  isFieldInvalid(field: FormControls) {
    return AuthFormsUtils.isFieldInvalid(this.Form!, field);
  }

  getErrorMessageText(field: FormControls) {
    return AuthFormsUtils.getErrorMessageText(this.Form!, field);
  }

  onFormSubmit() {
    const dataFromForm = Object.fromEntries(Object.entries(this.Form!.value));
    this.formSubmit.emit(dataFromForm as UserSignUp | UserLogIn);
  }

  ngOnDestroy(): void {
    this.Form = null;
  }
}
