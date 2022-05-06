import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from './core/services/language.service';

@Component({
  selector: 'ma-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'project-managing-app';
  constructor(private languageService: LanguageService, private translate: TranslateService) {
    this.languageService.language$.subscribe((lang) => {
      if (lang) {
        this.translate.use(lang);
      }
    });
  }
}
