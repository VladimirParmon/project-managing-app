import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  language$ = new BehaviorSubject('');

  applyLang(lang: string) {
    this.language$.next(lang);
  }
}
