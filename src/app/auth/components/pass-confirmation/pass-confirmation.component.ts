import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControls, FORMS_PATTERNS, LoginFormLimits } from '../../constants/auth-form.constants';
import { SettingsFormKey } from '../../constants/settings.constants';
import { PasswordConfirmationDialogData } from '../../models/dialog.model';
import { AuthFormsUtils } from '../../utils/auth-forms-utils';

@Component({
  selector: 'ma-pass-confirmation',
  templateUrl: './pass-confirmation.component.html',
  styleUrls: ['./pass-confirmation.component.scss'],
})
export class PassConfirmationComponent implements OnInit {
  public confirmPassForm: FormGroup | null = null;

  public isPassHidden: boolean = false;

  readonly FormKey = FormControls;

  readonly passwordValidators = [
    Validators.required,
    Validators.minLength(LoginFormLimits.passMinLen),
    Validators.pattern(FORMS_PATTERNS.digit),
    Validators.pattern(FORMS_PATTERNS.lowerCase),
    Validators.pattern(FORMS_PATTERNS.upperCase),
    Validators.pattern(FORMS_PATTERNS.symbol),
  ];

  constructor(
    public dialogRef: MatDialogRef<PassConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PasswordConfirmationDialogData
  ) {
    this.confirmPassForm = new FormGroup({
      [FormControls.currentPass]: new FormControl('', this.passwordValidators),
    });
  }

  ngOnInit(): void {
    if (this.data.type === SettingsFormKey.pass) {
      this.confirmPassForm?.addControl(
        FormControls.newPass,
        new FormControl('', this.passwordValidators)
      );
    }
  }

  toCancel() {
    this.dialogRef.close(['']);
  }

  sendPassword() {
    const transferData = this.isChangePasswordMode()
      ? [
          this.confirmPassForm?.controls[FormControls.currentPass].value,
          this.confirmPassForm?.controls[FormControls.newPass].value,
        ]
      : [this.confirmPassForm?.controls[FormControls.currentPass].value];

    this.dialogRef.close(transferData);
  }

  isFieldInvalid(key: FormControls) {
    return AuthFormsUtils.isFieldInvalid(this.confirmPassForm!, key);
  }

  getErrorMessageText() {
    return AuthFormsUtils.getErrorMessageText(this.confirmPassForm!, FormControls.pass);
  }

  isChangePasswordMode(): boolean {
    return Boolean(this.confirmPassForm?.controls[FormControls.newPass]);
  }
}
