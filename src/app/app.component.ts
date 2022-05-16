import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from './core/services/language.service';
import { selectIsLoading } from './redux/selectors/loading.selector';

@Component({
  selector: 'ma-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  readonly title = 'project-managing-app';
  public isLoading$ = this.store.select(selectIsLoading);

  constructor(
    private languageService: LanguageService,
    private translate: TranslateService,
    private store: Store
  ) {
    this.languageService.language$.subscribe((lang) => {
      if (lang) {
        this.translate.use(lang);
      }
    });
  }
}
