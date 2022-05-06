import { Component } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-language-switch',
  templateUrl: './language-switch.component.html',
  styleUrls: ['./language-switch.component.scss'],
})
export class LanguageSwitchComponent {
  constructor(private languageService: LanguageService) {}

  languageChange(event: MatSlideToggleChange) {
    const state = event.checked;
    this.languageService.applyLang(state ? 'ru' : 'en');
  }
}
