import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { deleteUser, selectUserLogin, selectUserName, updateUserData } from 'src/app/redux';
import { UrlPaths } from 'src/app/shared/constants/url-paths';
import { ErrorNotifierService } from 'src/app/shared/services/error-notifier.service';
import { PassConfirmationComponent } from '../../components/pass-confirmation/pass-confirmation.component';
import { LoginFormLimits } from '../../constants/auth-form.constants';
import { SettingsFormKey } from '../../constants/settings.constants';

@Component({
  selector: 'ma-user-settings-page',
  templateUrl: './user-settings-page.component.html',
  styleUrls: ['./user-settings-page.component.scss'],
})
export class UserSettingsPageComponent implements OnInit, OnDestroy {
  private userLogin: string = '';

  private userName: string = '';

  readonly SettingsKey = SettingsFormKey;

  readonly fields = [
    {
      key: SettingsFormKey.login as const,
      fieldType: 'text',
      isAbleToEdit: true,
    },
    {
      key: SettingsFormKey.name as const,
      fieldType: 'email',
      isAbleToEdit: true,
    },
  ];

  public EditMode = {
    [SettingsFormKey.name]: false,
    [SettingsFormKey.login]: false,
  };

  private name$ = this.store.select(selectUserName);

  private login$ = this.store.select(selectUserLogin);

  public editForm: FormGroup | null = null;

  private subscription = new Subscription();

  constructor(
    private store: Store,
    public dialog: MatDialog,
    private router: Router,
    private error: ErrorNotifierService
  ) {}

  get name(): string {
    return this.userName;
  }

  get login(): string {
    return this.userLogin;
  }

  ngOnInit(): void {
    this.subscription.add(
      this.name$.subscribe((name) => {
        if (name === '') this.router.navigate([UrlPaths.greeting]);
        if (name) {
          this.userName = name;
        }
      })
    );

    this.subscription.add(
      this.login$.subscribe((login) => {
        if (login) {
          this.userLogin = login;
        }
      })
    );

    this.editForm = new FormGroup({
      [SettingsFormKey.name]: new FormControl(this.userName, [
        Validators.minLength(LoginFormLimits.nameMinLen),
      ]),
      [SettingsFormKey.login]: new FormControl(this.userLogin, [Validators.email]),
    });
  }

  setEditStatus(key: SettingsFormKey): void {
    if (key === SettingsFormKey.pass || key === SettingsFormKey.del) return;
    this.EditMode[key] = true;
    this.fields.forEach((field) => {
      // eslint-disable-next-line no-param-reassign
      if (field.key !== key) field.isAbleToEdit = false;
    });
  }

  removeEditStatus(key: SettingsFormKey): void {
    if (key === SettingsFormKey.pass || key === SettingsFormKey.del) return;
    this.EditMode[key] = false;
    this.fields.forEach((field) => {
      // eslint-disable-next-line no-param-reassign
      field.isAbleToEdit = true;
    });
  }

  editFieldSubmit(key: SettingsFormKey): void {
    const passConfirm = this.dialog.open(PassConfirmationComponent, { data: { type: key } });

    passConfirm.afterClosed().subscribe(([password, newPassword]: string[]) => {
      if (password !== '') {
        const user = {
          name: this.editForm?.controls[SettingsFormKey.name].value,
          login: [this.login, this.editForm?.controls[SettingsFormKey.login].value],
          password,
          newPassword,
        };

        this.store.dispatch(updateUserData({ user }));

        this.removeEditStatus(key);
      }
    });
  }

  userDelete(): void {
    const passConfirm = this.dialog.open(PassConfirmationComponent, {
      data: { type: SettingsFormKey.del },
    });

    passConfirm.afterClosed().subscribe(([pass]) => {
      if (pass !== '') {
        const user = {
          name: this.editForm?.controls[SettingsFormKey.name].value,
          login: this.editForm?.controls[SettingsFormKey.login].value,
          password: pass,
        };

        this.store.dispatch(deleteUser({ user }));
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
